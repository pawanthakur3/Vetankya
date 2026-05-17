export function calculate(inputs) {
  const {
    ctcL, cityTier, rentPaidL, homeLoanInterestL,
    section80cL, npsL, medicalL, regime,
    otherAllowL,
  } = inputs;

  const ctc          = ctcL * 100000;
  const rentPaid     = (rentPaidL || 0) * 100000;
  const homeLoan     = (homeLoanInterestL || 0) * 100000;
  const sec80c       = Math.min((section80cL || 0) * 100000, 150000);
  const nps          = Math.min((npsL || 0) * 100000, 50000);
  const medical      = Math.min((medicalL || 0) * 100000, 25000);
  const otherAllow   = (otherAllowL || 0) * 100000;

  // Salary structure (standard Indian breakdown)
  const basic        = ctc * 0.40;
  const hra          = ctc * 0.20;
  const specialAllow = ctc * 0.20;
  const lta          = ctc * 0.05;
  const otherComp    = ctc * 0.05;
  const empPF        = Math.min(basic * 0.12, 21600);   // employee share
  const emplrPF      = Math.min(basic * 0.12, 21600);   // employer share (in CTC)
  const gratuity     = Math.min(basic * 0.0481, 20000); // ~4.81% of basic, max ₹20L/yr approx
  const profTax      = 2400; // ₹200/month most states

  // HRA exemption (old regime only)
  const hraExemption = () => {
    const actualHra   = hra;
    const rentMinus10 = Math.max(0, rentPaid - basic * 0.10);
    const metroLimit  = cityTier === "metro" ? basic * 0.50 : basic * 0.40;
    return Math.min(actualHra, rentMinus10, metroLimit);
  };

  // Standard deduction
  const stdDed = regime === "new" ? 75000 : 50000;

  // Gross taxable income
  let taxableIncome;
  if (regime === "new") {
    taxableIncome = Math.max(0,
      ctc - empPF - emplrPF - gratuity - profTax - stdDed - nps * 0.14
    );
  } else {
    const hraEx = hraExemption();
    const homeLoanDed = Math.min(homeLoan, 200000);
    const ltaEx = Math.min(lta, 20000);
    taxableIncome = Math.max(0,
      ctc - empPF - emplrPF - gratuity - profTax - stdDed
        - hraEx - sec80c - nps - medical - homeLoanDed - ltaEx
    );
  }

  // Tax slabs FY 2026-27
  let incomeTax = 0;
  if (regime === "new") {
    // New regime slabs (Budget 2025 update)
    const slabs = [
      [400000, 0],
      [400000, 0.05],
      [400000, 0.10],
      [400000, 0.15],
      [400000, 0.20],
      [Infinity, 0.30],
    ];
    let rem = taxableIncome;
    for (const [lim, rate] of slabs) {
      const chunk = Math.min(rem, lim);
      incomeTax += chunk * rate;
      rem -= chunk;
      if (rem <= 0) break;
    }
    // Rebate 87A — zero tax if income ≤ ₹7L (new regime)
    if (taxableIncome <= 700000) incomeTax = 0;
  } else {
    // Old regime slabs
    const slabs = [
      [250000, 0],
      [250000, 0.05],
      [500000, 0.20],
      [Infinity, 0.30],
    ];
    let rem = taxableIncome;
    for (const [lim, rate] of slabs) {
      const chunk = Math.min(rem, lim);
      incomeTax += chunk * rate;
      rem -= chunk;
      if (rem <= 0) break;
    }
    // Rebate 87A — zero tax if income ≤ ₹5L (old regime)
    if (taxableIncome <= 500000) incomeTax = 0;
    // Surcharge
    if (taxableIncome > 5000000)  incomeTax *= taxableIncome > 10000000 ? 1.15 : 1.10;
  }

  const cess          = incomeTax * 0.04;
  const totalTax      = incomeTax + cess;
  const effectiveRate = ctc > 0 ? ((totalTax / ctc) * 100) : 0;

  const annualNet = ctc - empPF - profTax - totalTax - emplrPF - gratuity;
  const monthly   = annualNet / 12;

  // Monthly breakdown
  const monthlyBasic   = basic / 12;
  const monthlyHra     = hra / 12;
  const monthlySpecial = specialAllow / 12;
  const monthlyLta     = lta / 12;
  const monthlyEmpPF   = empPF / 12;
  const monthlyTax     = totalTax / 12;
  const monthlyProfTax = profTax / 12;
  const monthlyGross   = (ctc - emplrPF - gratuity) / 12;

  // Regime comparison (compute opposite regime quickly)
  let altTax = 0;
  const altRegime = regime === "new" ? "old" : "new";
  let altTaxable;
  if (altRegime === "new") {
    altTaxable = Math.max(0, ctc - empPF - emplrPF - gratuity - profTax - 75000);
  } else {
    const hraEx = hraExemption();
    altTaxable = Math.max(0, ctc - empPF - emplrPF - gratuity - profTax - 50000 - hraEx - sec80c);
  }
  const altSlabs = altRegime === "new"
    ? [[400000,0],[400000,.05],[400000,.10],[400000,.15],[400000,.20],[Infinity,.30]]
    : [[250000,0],[250000,.05],[500000,.20],[Infinity,.30]];
  let remAlt = altTaxable;
  for (const [lim,rate] of altSlabs) { const c=Math.min(remAlt,lim); altTax+=c*rate; remAlt-=c; if(remAlt<=0) break; }
  if (altRegime==="new" && altTaxable<=700000) altTax=0;
  if (altRegime==="old" && altTaxable<=500000) altTax=0;
  altTax *= 1.04;
  const altSaving = altTax - totalTax; // +ve means current regime saves money

  return {
    ctc, basic, hra, specialAllow, lta, otherComp,
    empPF, emplrPF, gratuity, profTax, stdDed,
    taxableIncome, incomeTax, cess, totalTax,
    effectiveRate, annualNet, monthly,
    monthlyBasic, monthlyHra, monthlySpecial, monthlyLta,
    monthlyEmpPF, monthlyTax, monthlyProfTax, monthlyGross,
    altSaving, altRegime,
  };
}

export function fmtINR(n) {
  if (n === undefined || n === null) return "—";
  const abs = Math.abs(Math.round(n));
  const str = abs.toLocaleString("en-IN");
  return (n < 0 ? "−" : "") + "₹" + str;
}

export function fmtL(n) {
  if (!n && n !== 0) return "—";
  return "₹" + (Math.abs(n) / 100000).toFixed(2) + "L";
}
