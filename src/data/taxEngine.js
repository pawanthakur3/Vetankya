export function calculate(inputs) {
  const {
    ctcL, cityTier, rentPaidL, homeLoanInterestL,
    section80cL, npsL, medicalL, regime,
  } = inputs;

  const ctc             = ctcL * 100000;
  const rentPaid        = (rentPaidL || 0) * 100000;
  const homeLoan        = (homeLoanInterestL || 0) * 100000;
  const sec80c          = Math.min((section80cL || 0) * 100000, 150000);
  const nps             = Math.min((npsL || 0) * 100000, 50000);
  const medical         = Math.min((medicalL || 0) * 100000, 25000);

  const basic           = ctc * 0.40;
  const hra             = ctc * 0.20;
  const specialAllow    = ctc * 0.20;
  const lta             = ctc * 0.05;
  const empPF           = Math.min(basic * 0.12, 21600);
  const emplrPF         = Math.min(basic * 0.12, 21600);
  const gratuity        = Math.min(basic * 0.0481, 20000);
  const profTax         = 2400;
  const stdDed          = regime === "new" ? 75000 : 50000;

  const hraExemption = () => {
    const rentMinus10 = Math.max(0, rentPaid - basic * 0.10);
    const metroLimit  = cityTier === "metro" ? basic * 0.50 : basic * 0.40;
    return Math.min(hra, rentMinus10, metroLimit);
  };

  let taxableIncome;
  if (regime === "new") {
    taxableIncome = Math.max(0, ctc - empPF - emplrPF - gratuity - profTax - stdDed);
  } else {
    const hraEx        = hraExemption();
    const homeLoanDed  = Math.min(homeLoan, 200000);
    const ltaEx        = Math.min(lta, 20000);
    taxableIncome = Math.max(0,
      ctc - empPF - emplrPF - gratuity - profTax - stdDed
        - hraEx - sec80c - nps - medical - homeLoanDed - ltaEx
    );
  }

  let incomeTax = 0;
  if (regime === "new") {
    const slabs = [[400000,0],[400000,.05],[400000,.10],[400000,.15],[400000,.20],[Infinity,.30]];
    let rem = taxableIncome;
    for (const [lim,rate] of slabs) { const c=Math.min(rem,lim); incomeTax+=c*rate; rem-=c; if(rem<=0) break; }
    if (taxableIncome <= 700000) incomeTax = 0;
  } else {
    const slabs = [[250000,0],[250000,.05],[500000,.20],[Infinity,.30]];
    let rem = taxableIncome;
    for (const [lim,rate] of slabs) { const c=Math.min(rem,lim); incomeTax+=c*rate; rem-=c; if(rem<=0) break; }
    if (taxableIncome <= 500000) incomeTax = 0;
    if (taxableIncome > 5000000) incomeTax *= taxableIncome > 10000000 ? 1.15 : 1.10;
  }

  const cess          = incomeTax * 0.04;
  const totalTax      = incomeTax + cess;
  const effectiveRate = ctc > 0 ? (totalTax / ctc) * 100 : 0;
  const annualNet     = ctc - empPF - profTax - totalTax - emplrPF - gratuity;
  const monthly       = annualNet / 12;

  // Alternate regime comparison
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
  let remA = altTaxable;
  for (const [lim,rate] of altSlabs) { const c=Math.min(remA,lim); altTax+=c*rate; remA-=c; if(remA<=0) break; }
  if (altRegime==="new" && altTaxable<=700000) altTax=0;
  if (altRegime==="old" && altTaxable<=500000) altTax=0;
  altTax *= 1.04;
  const altSaving = altTax - totalTax;

  return {
    ctc, basic, hra, specialAllow, lta,
    empPF, emplrPF, gratuity, profTax, stdDed,
    taxableIncome, incomeTax, cess, totalTax,
    effectiveRate, annualNet, monthly,
    monthlyBasic:   basic/12,
    monthlyHra:     hra/12,
    monthlySpecial: specialAllow/12,
    monthlyLta:     lta/12,
    monthlyEmpPF:   empPF/12,
    monthlyTax:     totalTax/12,
    monthlyProfTax: profTax/12,
    monthlyGross:   (ctc - emplrPF - gratuity)/12,
    altSaving, altRegime,
  };
}

export const fmtINR = (n) => "₹" + Math.round(Math.abs(n)).toLocaleString("en-IN");
export const fmtL   = (n) => "₹" + (Math.abs(n)/100000).toFixed(2) + "L";
