import { useState, useMemo } from "react";
import "./styles/globals.css";
import { calculate, fmtINR, fmtL } from "./components/taxEngine";

const CITIES = [
  { val: "metro",   label: "Metro city (Mumbai, Delhi, Kolkata, Chennai)" },
  { val: "tier1",   label: "Tier-1 city (Bengaluru, Hyderabad, Pune, Ahmedabad)" },
  { val: "tier2",   label: "Tier-2 city (Jaipur, Indore, Kochi, Chandigarh)" },
];

const defaultInputs = {
  ctcL: "",
  cityTier: "tier1",
  rentPaidL: "",
  homeLoanInterestL: "",
  section80cL: "",
  npsL: "",
  medicalL: "",
  regime: "new",
  otherAllowL: "",
};

function Label({ children, hint }) {
  return (
    <div style={{ marginBottom: "6px" }}>
      <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text3)" }}>{children}</span>
      {hint && <span style={{ fontSize: "11px", color: "var(--text3)", marginLeft: "6px" }}>({hint})</span>}
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <Label hint={hint}>{label}</Label>
      {children}
    </div>
  );
}

function RupeeInput({ value, onChange, placeholder }) {
  return (
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "var(--text3)", fontFamily: "var(--mono)", fontWeight: 500 }}>₹L</span>
      <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || "e.g. 12"} min="0" step="0.5"
        style={{ paddingLeft: "40px", fontFamily: "var(--mono)", fontSize: "15px", fontWeight: 500, letterSpacing: "0.02em" }} />
    </div>
  );
}

function StatCard({ label, value, sub, color, large, key: _k }) {
  return (
    <div className="count-up" style={{
      background: "var(--surface2)", borderRadius: "var(--radius-lg)",
      border: `1px solid ${color ? color + "33" : "var(--border)"}`,
      padding: large ? "22px 24px" : "16px 18px",
      position: "relative", overflow: "hidden",
    }}>
      {color && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: color }} />}
      <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text3)", marginBottom: "8px" }}>{label}</div>
      <div style={{ fontFamily: "var(--mono)", fontSize: large ? "1.9rem" : "1.3rem", fontWeight: 500, color: color || "var(--text)", lineHeight: 1, marginBottom: "6px" }}>{value}</div>
      {sub && <div style={{ fontSize: "12px", color: "var(--text3)" }}>{sub}</div>}
    </div>
  );
}

function BarRow({ label, value, max, color, negative }) {
  const pct = max > 0 ? Math.min(100, Math.abs(value) / max * 100) : 0;
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
        <span style={{ fontSize: "13px", color: "var(--text2)" }}>{label}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: "13px", color: negative ? "var(--red)" : "var(--text)", fontWeight: 500 }}>
          {negative ? "−" : ""}{fmtINR(Math.abs(value))}<span style={{ color: "var(--text3)", fontSize: "11px" }}>/mo</span>
        </span>
      </div>
      <div style={{ height: "4px", background: "var(--surface3)", borderRadius: "99px", overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: color, borderRadius: "99px", transition: "width 0.5s cubic-bezier(0.34,1.56,0.64,1)" }} />
      </div>
    </div>
  );
}

function Section({ title, children, collapsed, onToggle }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", marginBottom: "12px", overflow: "hidden" }}>
      <button onClick={onToggle} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 18px", background: "none", border: "none", color: "var(--text)",
        fontSize: "13px", fontWeight: 600, letterSpacing: "0.02em",
      }}>
        {title}
        <span style={{ color: "var(--text3)", fontSize: "16px", transition: "transform 0.2s", transform: collapsed ? "rotate(0deg)" : "rotate(180deg)" }}>⌄</span>
      </button>
      {!collapsed && <div style={{ padding: "4px 18px 18px" }}>{children}</div>}
    </div>
  );
}

export default function App() {
  const [inp, setInp]   = useState(defaultInputs);
  const [open, setOpen] = useState({ basic: true, deductions: false, regime: true });

  const set = (k, v) => setInp(p => ({ ...p, [k]: v }));

  const result = useMemo(() => {
    const ctc = parseFloat(inp.ctcL);
    if (!ctc || ctc <= 0) return null;
    return calculate({ ...inp, ctcL: ctc, rentPaidL: parseFloat(inp.rentPaidL) || 0, homeLoanInterestL: parseFloat(inp.homeLoanInterestL) || 0, section80cL: parseFloat(inp.section80cL) || 0, npsL: parseFloat(inp.npsL) || 0, medicalL: parseFloat(inp.medicalL) || 0, otherAllowL: parseFloat(inp.otherAllowL) || 0 });
  }, [inp]);

  const toggle = (k) => setOpen(p => ({ ...p, [k]: !p[k] }));

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* NAV */}
      <nav style={{ borderBottom: "1px solid var(--border)", padding: "0 5%", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(12,14,20,0.92)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1px" }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text)", fontStyle: "italic" }}>Salary</span>
          <span style={{ fontFamily: "var(--sans)", fontSize: "1.3rem", fontWeight: 600, color: "var(--teal)", letterSpacing: "-0.02em" }}>Check</span>
          <span style={{ fontSize: "11px", color: "var(--text3)", marginLeft: "6px", fontWeight: 400 }}>.in</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "12px", color: "var(--text3)" }}>FY 2026–27</span>
          <div style={{ height: "16px", width: "1px", background: "var(--border2)" }} />
          <a href="https://banaoresume.vercel.app" target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "var(--teal)", textDecoration: "none", fontWeight: 500 }}>Build your resume →</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ padding: "52px 5% 0", textAlign: "center", maxWidth: "760px", margin: "0 auto" }} className="fade-up">
        <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "var(--teal-dim)", border: "1px solid rgba(45,212,191,0.2)", color: "var(--teal)", padding: "5px 14px", borderRadius: "99px", fontSize: "12px", fontWeight: 500, marginBottom: "20px" }}>
          🇮🇳 Free · No login · FY 2026-27 tax slabs
        </div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 400, color: "var(--text)", lineHeight: 1.15, marginBottom: "14px" }}>
          CTC to In-Hand<br /><em style={{ color: "var(--teal)" }}>Salary Calculator</em>
        </h1>
        <p style={{ fontSize: "15px", color: "var(--text2)", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          Enter your CTC and get your exact monthly take-home — after income tax, PF, HRA, and every deduction. New & old regime comparison included.
        </p>
      </div>

      {/* MAIN GRID */}
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 5% 80px", display: "grid", gridTemplateColumns: "380px 1fr", gap: "24px", alignItems: "start" }}>

        {/* ── LEFT: INPUTS ── */}
        <div className="fade-up-2">
          {/* CTC input — always visible */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: "var(--radius-lg)", padding: "20px", marginBottom: "12px" }}>
            <Field label="Annual CTC" hint="in Lakhs ₹">
              <RupeeInput value={inp.ctcL} onChange={v => set("ctcL", v)} placeholder="e.g. 12.5" />
              <p style={{ fontSize: "11px", color: "var(--text3)", marginTop: "5px" }}>Enter your total cost to company per year</p>
            </Field>
            <Field label="Work city">
              <select value={inp.cityTier} onChange={e => set("cityTier", e.target.value)}>
                {CITIES.map(c => <option key={c.val} value={c.val}>{c.label}</option>)}
              </select>
            </Field>
          </div>

          {/* Regime toggle */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "16px 18px", marginBottom: "12px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text3)", marginBottom: "10px" }}>Tax regime</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {[["new", "New Regime", "₹75K std deduction, no 80C"], ["old", "Old Regime", "HRA + 80C + deductions"]].map(([val, label, sub]) => (
                <button key={val} onClick={() => set("regime", val)} style={{
                  padding: "11px 12px", borderRadius: "8px", border: `1px solid ${inp.regime === val ? "var(--teal)" : "var(--border)"}`,
                  background: inp.regime === val ? "var(--teal-dim)" : "var(--surface2)",
                  color: inp.regime === val ? "var(--teal)" : "var(--text2)",
                  textAlign: "left", transition: "all 0.15s",
                }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "2px" }}>{label}</div>
                  <div style={{ fontSize: "11px", opacity: 0.7 }}>{sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Old regime deductions */}
          <Section title="Deductions & allowances" collapsed={open.deductions} onToggle={() => toggle("deductions")}>
            {inp.regime === "old" && (
              <>
                <Field label="Monthly rent paid" hint="₹L/year">
                  <RupeeInput value={inp.rentPaidL} onChange={v => set("rentPaidL", v)} placeholder="e.g. 2.4 (₹20k/month)" />
                </Field>
                <Field label="Section 80C investments" hint="max ₹1.5L">
                  <RupeeInput value={inp.section80cL} onChange={v => set("section80cL", v)} placeholder="PF + ELSS + PPF + LIC..." />
                </Field>
                <Field label="Home loan interest" hint="80EEA, max ₹2L">
                  <RupeeInput value={inp.homeLoanInterestL} onChange={v => set("homeLoanInterestL", v)} placeholder="e.g. 1.5" />
                </Field>
                <Field label="Medical insurance premium" hint="80D, max ₹25k">
                  <RupeeInput value={inp.medicalL} onChange={v => set("medicalL", v)} placeholder="e.g. 0.15" />
                </Field>
              </>
            )}
            <Field label="NPS contribution" hint={inp.regime === "new" ? "80CCD(2), up to ₹50k" : "80CCD(1B), up to ₹50k"}>
              <RupeeInput value={inp.npsL} onChange={v => set("npsL", v)} placeholder="e.g. 0.5" />
            </Field>
            {inp.regime === "old" && (
              <p style={{ fontSize: "11px", color: "var(--text3)", lineHeight: 1.6, marginTop: "4px" }}>
                HRA exemption is auto-calculated from your rent paid, city tier, and basic salary.
              </p>
            )}
            {inp.regime === "new" && (
              <p style={{ fontSize: "12px", color: "var(--text3)", lineHeight: 1.6 }}>
                Under new regime, only NPS employer contribution (80CCD(2)) and standard deduction (₹75,000) apply.
              </p>
            )}
          </Section>
        </div>

        {/* ── RIGHT: RESULTS ── */}
        <div className="fade-up-3">
          {!result ? (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "60px 32px", textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px", opacity: 0.4 }}>₹</div>
              <p style={{ color: "var(--text3)", fontSize: "15px" }}>Enter your CTC to see your complete salary breakdown</p>
            </div>
          ) : (
            <div key={inp.ctcL + inp.regime}>
              {/* Hero result */}
              <div style={{ background: "var(--surface)", border: "1px solid rgba(45,212,191,0.2)", borderRadius: "var(--radius-lg)", padding: "28px 32px", marginBottom: "16px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, var(--teal), transparent)" }} />
                <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text3)", marginBottom: "10px" }}>Monthly in-hand salary</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: "var(--teal)", lineHeight: 1, marginBottom: "8px" }} className="count-up">
                  {fmtINR(result.monthly)}
                </div>
                <div style={{ fontSize: "13px", color: "var(--text3)" }}>
                  Annual: <span style={{ color: "var(--text2)", fontFamily: "var(--mono)" }}>{fmtINR(result.annualNet)}</span>
                  <span style={{ margin: "0 10px", opacity: 0.3 }}>·</span>
                  Effective tax: <span style={{ color: result.effectiveRate > 20 ? "var(--red)" : "var(--text2)", fontFamily: "var(--mono)" }}>{result.effectiveRate.toFixed(1)}%</span>
                </div>

                {/* Regime recommendation */}
                {Math.abs(result.altSaving) > 500 && (
                  <div style={{ marginTop: "16px", padding: "10px 14px", background: result.altSaving < 0 ? "var(--red-dim)" : "var(--green-dim)", borderRadius: "8px", fontSize: "12px", color: result.altSaving < 0 ? "var(--red)" : "var(--green)", border: `1px solid ${result.altSaving < 0 ? "rgba(248,113,113,0.2)" : "rgba(52,211,153,0.2)"}` }}>
                    {result.altSaving < 0
                      ? `⚠ Switch to ${result.altRegime} regime — saves ${fmtINR(Math.abs(result.altSaving))} annually`
                      : `✓ ${inp.regime === "new" ? "New" : "Old"} regime is better for you — saves ${fmtINR(Math.abs(result.altSaving))} vs ${result.altRegime} regime`
                    }
                  </div>
                )}
              </div>

              {/* Key stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                <StatCard label="Income tax + cess" value={fmtL(result.totalTax)} sub={`${result.effectiveRate.toFixed(1)}% of CTC`} color="var(--red)" />
                <StatCard label="Employee PF" value={fmtL(result.empPF)} sub="Annual (₹1,800/mo max)" color="var(--gold)" />
                <StatCard label="Taxable income" value={fmtL(result.taxableIncome)} sub="After all deductions" color="var(--blue)" />
              </div>

              {/* Monthly breakdown bars */}
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "22px 24px", marginBottom: "16px" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text3)", marginBottom: "18px" }}>Monthly breakdown</div>
                <BarRow label="Basic salary"          value={result.monthlyBasic}   max={result.monthlyGross} color="var(--teal)" />
                <BarRow label="HRA"                   value={result.monthlyHra}     max={result.monthlyGross} color="var(--blue)" />
                <BarRow label="Special allowance"     value={result.monthlySpecial} max={result.monthlyGross} color="#818CF8" />
                <BarRow label="Leave travel allowance" value={result.monthlyLta}   max={result.monthlyGross} color="#C084FC" />
                <div style={{ borderTop: "1px solid var(--border)", margin: "14px 0" }} />
                <BarRow label="Employee PF deduction" value={result.monthlyEmpPF}  max={result.monthlyGross} color="var(--gold)"  negative />
                <BarRow label="Professional tax"      value={result.monthlyProfTax} max={result.monthlyGross} color="var(--gold)" negative />
                <BarRow label="Income tax (TDS)"      value={result.monthlyTax}    max={result.monthlyGross} color="var(--red)"  negative />
                <div style={{ borderTop: "1px solid var(--border)", margin: "14px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>Net monthly in-hand</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "1.2rem", fontWeight: 500, color: "var(--teal)" }}>{fmtINR(result.monthly)}</span>
                </div>
              </div>

              {/* Full annual table */}
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "22px 24px", marginBottom: "16px" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text3)", marginBottom: "16px" }}>Annual salary structure</div>
                {[
                  { label: "Gross CTC",                val: result.ctc,          type: "neutral" },
                  { label: "Employer PF contribution", val: -result.emplrPF,     type: "deduct"  },
                  { label: "Gratuity (employer)",      val: -result.gratuity,    type: "deduct"  },
                  { label: "Gross salary",             val: result.ctc - result.emplrPF - result.gratuity, type: "sub" },
                  { label: "Employee PF",              val: -result.empPF,       type: "deduct"  },
                  { label: "Professional tax",         val: -result.profTax,     type: "deduct"  },
                  { label: "Income tax + cess",        val: -result.totalTax,    type: "deduct"  },
                  { label: "Net annual take-home",     val: result.annualNet,    type: "total"   },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < 7 ? "1px solid var(--border)" : "none", background: row.type === "total" ? "none" : "none" }}>
                    <span style={{ fontSize: "13px", color: row.type === "total" ? "var(--text)" : row.type === "sub" ? "var(--text2)" : "var(--text2)", fontWeight: row.type === "total" ? 600 : 400 }}>{row.label}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "13px", fontWeight: row.type === "total" ? 600 : 400, color: row.type === "total" ? "var(--teal)" : row.val < 0 ? "var(--red)" : "var(--text2)" }}>
                      {row.val < 0 ? "−" : ""}{fmtINR(Math.abs(row.val))}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tax slab breakdown */}
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "22px 24px", marginBottom: "16px" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text3)", marginBottom: "16px" }}>
                  Tax calculation — {inp.regime === "new" ? "New" : "Old"} regime
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "13px", color: "var(--text2)" }}>Taxable income after deductions</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text)" }}>{fmtINR(result.taxableIncome)}</span>
                </div>
                {inp.regime === "new" ? (
                  [
                    { range: "Up to ₹4L", rate: "0%", note: "Nil" },
                    { range: "₹4L – ₹8L", rate: "5%" },
                    { range: "₹8L – ₹12L", rate: "10%" },
                    { range: "₹12L – ₹16L", rate: "15%" },
                    { range: "₹16L – ₹20L", rate: "20%" },
                    { range: "Above ₹20L", rate: "30%" },
                  ]
                ) : (
                  [
                    { range: "Up to ₹2.5L", rate: "0%", note: "Nil" },
                    { range: "₹2.5L – ₹5L", rate: "5%" },
                    { range: "₹5L – ₹10L", rate: "20%" },
                    { range: "Above ₹10L", rate: "30%" },
                  ]
                )}.map((s, i, arr) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <span style={{ fontSize: "13px", color: "var(--text3)" }}>{s.range}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text2)" }}>{s.rate}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", marginTop: "4px" }}>
                  <span style={{ fontSize: "13px", color: "var(--text)" }}>Income tax + 4% cess</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--red)", fontWeight: 600 }}>{fmtINR(result.totalTax)}</span>
                </div>
                {result.taxableIncome <= (inp.regime === "new" ? 700000 : 500000) && (
                  <div style={{ marginTop: "10px", padding: "8px 12px", background: "var(--green-dim)", borderRadius: "6px", fontSize: "12px", color: "var(--green)" }}>
                    ✓ 87A rebate applies — zero tax since taxable income ≤ {inp.regime === "new" ? "₹7L" : "₹5L"}
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <p style={{ fontSize: "11px", color: "var(--text3)", lineHeight: 1.7, padding: "0 4px" }}>
                Disclaimer: This is an estimate based on standard salary structures (40% basic, 20% HRA, 20% special allowance). Actual take-home varies by company structure, city HRA limits, and individual investments. Consult a chartered accountant for precise calculations.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "20px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <span style={{ fontSize: "12px", color: "var(--text3)" }}>© 2026 SalaryCheck.in · Free forever · FY 2026-27 tax slabs</span>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="https://banaoresume.vercel.app" target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "var(--teal)", textDecoration: "none" }}>Build a free resume →</a>
        </div>
      </div>
    </div>
  );
}
