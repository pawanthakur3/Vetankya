import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { calculate, fmtINR, fmtL } from "../data/taxEngine";

const CITIES = [
  { val:"metro",  label:"Metro (Mumbai, Delhi, Kolkata, Chennai)" },
  { val:"tier1",  label:"Tier-1 (Bengaluru, Hyderabad, Pune, Ahmedabad)" },
  { val:"tier2",  label:"Tier-2 (Jaipur, Indore, Kochi, Chandigarh)" },
];
const DEF = { ctcL:"", cityTier:"tier1", rentPaidL:"", homeLoanInterestL:"", section80cL:"", npsL:"", medicalL:"", regime:"new" };

function RupeeInput({ value, onChange, placeholder }) {
  return (
    <div style={{ position:"relative" }}>
      <span style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", fontSize:"12px", color:"var(--ink3)", fontWeight:600 }}>₹L</span>
      <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder||"e.g. 12"} min="0" step="0.5" style={{ paddingLeft:"38px", fontWeight:600 }} />
    </div>
  );
}

function BarRow({ label, value, max, color, negative }) {
  const pct = max > 0 ? Math.min(100, Math.abs(value)/max*100) : 0;
  return (
    <div style={{ marginBottom:"10px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
        <span style={{ fontSize:"13px", color:"var(--ink2)" }}>{label}</span>
        <span style={{ fontSize:"13px", fontWeight:600, color:negative?"#EF4444":"var(--teal-dark)" }}>
          {negative?"−":"+"}{fmtINR(Math.abs(value))}<span style={{ fontSize:"11px", fontWeight:400, color:"var(--ink3)" }}>/mo</span>
        </span>
      </div>
      <div style={{ height:"5px", background:"var(--border)", borderRadius:"99px", overflow:"hidden" }}>
        <div style={{ width:pct+"%", height:"100%", background:color, borderRadius:"99px", transition:"width 0.5s ease" }} />
      </div>
    </div>
  );
}

export default function CalculatorPage({ onBack, onCheck }) {
  const [inp, setInp]         = useState(DEF);
  const [showDed, setShowDed] = useState(false);
  const set = (k,v) => setInp(p => ({...p,[k]:v}));

  const result = useMemo(() => {
    const ctc = parseFloat(inp.ctcL);
    if (!ctc || ctc <= 0) return null;
    return calculate({ ...inp, ctcL:ctc, rentPaidL:parseFloat(inp.rentPaidL)||0, homeLoanInterestL:parseFloat(inp.homeLoanInterestL)||0, section80cL:parseFloat(inp.section80cL)||0, npsL:parseFloat(inp.npsL)||0, medicalL:parseFloat(inp.medicalL)||0 });
  }, [inp]);

  return (
    <div style={{ background:"var(--off)", minHeight:"100vh" }}>
      <Navbar onHome={onBack} onCalc={() => {}} onCheck={onCheck} />
      <div style={{ paddingTop:"var(--nav-h)", maxWidth:"1000px", margin:"0 auto", padding:"calc(var(--nav-h) + 32px) 5% 80px" }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:"var(--ink3)", fontSize:"13px", fontWeight:600, cursor:"pointer", marginBottom:"20px", display:"flex", alignItems:"center", gap:"4px" }}>← Home</button>
        <div style={{ marginBottom:"28px" }}>
          <h1 style={{ fontFamily:"var(--fraunces)", fontSize:"clamp(1.8rem,3vw,2.4rem)", fontWeight:700, color:"var(--ink)", marginBottom:"6px" }}>CTC to In-Hand Calculator</h1>
          <p style={{ fontSize:"14px", color:"var(--ink3)" }}>Know your exact take-home after income tax, PF, and all deductions. FY 2026–27 tax slabs.</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"360px 1fr", gap:"24px", alignItems:"start" }}>
          {/* INPUTS */}
          <div>
            <div style={{ background:"white", border:"1.5px solid var(--border)", borderRadius:"var(--radius-lg)", padding:"22px", marginBottom:"12px" }}>
              <div style={{ marginBottom:"16px" }}>
                <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"6px" }}>Annual CTC (₹ Lakhs)</label>
                <RupeeInput value={inp.ctcL} onChange={v => set("ctcL",v)} />
              </div>
              <div style={{ marginBottom:"16px" }}>
                <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"6px" }}>City</label>
                <select value={inp.cityTier} onChange={e => set("cityTier",e.target.value)} style={{ appearance:"none", backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center", paddingRight:"34px" }}>
                  {CITIES.map(c => <option key={c.val} value={c.val}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"8px" }}>Tax regime</label>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                  {[["new","New Regime","₹75K std. deduction"],["old","Old Regime","HRA + 80C + more"]].map(([val,label,sub]) => (
                    <button key={val} onClick={() => set("regime",val)} style={{ padding:"10px 12px", borderRadius:"8px", border:`1.5px solid ${inp.regime===val?"var(--teal)":"var(--border)"}`, background:inp.regime===val?"var(--teal-light)":"white", color:inp.regime===val?"var(--teal-dark)":"var(--ink2)", textAlign:"left", cursor:"pointer", transition:"all 0.15s" }}>
                      <div style={{ fontSize:"13px", fontWeight:700, marginBottom:"1px" }}>{label}</div>
                      <div style={{ fontSize:"11px", opacity:0.7 }}>{sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ background:"white", border:"1.5px solid var(--border)", borderRadius:"var(--radius-lg)", overflow:"hidden" }}>
              <button onClick={() => setShowDed(s=>!s)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", background:"none", border:"none", color:"var(--ink)", fontSize:"13px", fontWeight:600, cursor:"pointer" }}>
                {inp.regime==="old" ? "Deductions & exemptions" : "Additional deductions"}
                <span style={{ color:"var(--ink3)", transition:"transform 0.2s", display:"inline-block", transform:showDed?"rotate(180deg)":"none" }}>⌄</span>
              </button>
              {showDed && (
                <div style={{ padding:"4px 18px 18px", borderTop:"1px solid var(--border)" }}>
                  {inp.regime==="old" && (
                    <>
                      {[
                        ["rentPaidL","Rent paid/year (₹L)","for HRA exemption","e.g. 2.4"],
                        ["section80cL","80C investments (₹L)","max ₹1.5L","PPF + ELSS + LIC"],
                        ["homeLoanInterestL","Home loan interest (₹L)","max ₹2L","e.g. 1.5"],
                        ["medicalL","Medical premium 80D (₹L)","max ₹25k","e.g. 0.20"],
                      ].map(([key,label,hint,ph]) => (
                        <div key={key} style={{ marginBottom:"12px" }}>
                          <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"5px" }}>{label} <span style={{ fontWeight:400, textTransform:"none", letterSpacing:0 }}>— {hint}</span></label>
                          <RupeeInput value={inp[key]} onChange={v => set(key,v)} placeholder={ph} />
                        </div>
                      ))}
                    </>
                  )}
                  <div>
                    <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"5px" }}>NPS contribution (₹L) <span style={{ fontWeight:400, textTransform:"none", letterSpacing:0 }}>— max ₹50k</span></label>
                    <RupeeInput value={inp.npsL} onChange={v => set("npsL",v)} placeholder="e.g. 0.5" />
                  </div>
                  {inp.regime==="new" && <p style={{ fontSize:"11px", color:"var(--ink3)", marginTop:"10px", lineHeight:1.6 }}>Under new regime, only NPS and ₹75,000 standard deduction apply. No HRA or 80C.</p>}
                </div>
              )}
            </div>
          </div>

          {/* RESULTS */}
          <div>
            {!result ? (
              <div style={{ background:"white", border:"1.5px solid var(--border)", borderRadius:"var(--radius-lg)", padding:"60px 32px", textAlign:"center" }}>
                <div style={{ fontSize:"48px", marginBottom:"16px", opacity:0.15 }}>₹</div>
                <p style={{ color:"var(--ink3)", fontSize:"15px" }}>Enter your CTC on the left to see your full salary breakdown</p>
              </div>
            ) : (
              <>
                <div style={{ background:"linear-gradient(135deg, var(--teal-dark), var(--teal))", borderRadius:"var(--radius-lg)", padding:"24px 28px", marginBottom:"14px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"12px" }}>
                    <div style={{ color:"white" }}>
                      <div style={{ fontSize:"11px", opacity:0.8, marginBottom:"4px", textTransform:"uppercase", letterSpacing:"0.06em" }}>Monthly in-hand</div>
                      <div style={{ fontFamily:"var(--fraunces)", fontSize:"clamp(2rem,4vw,2.8rem)", fontWeight:700, lineHeight:1 }}>{fmtINR(result.monthly)}</div>
                      <div style={{ fontSize:"13px", opacity:0.75, marginTop:"8px" }}>Annual: {fmtINR(result.annualNet)} · Tax rate: {result.effectiveRate.toFixed(1)}%</div>
                    </div>
                    <div style={{ color:"white", textAlign:"right" }}>
                      <div style={{ fontSize:"11px", opacity:0.75, marginBottom:"3px" }}>Tax + cess / year</div>
                      <div style={{ fontFamily:"var(--fraunces)", fontSize:"1.6rem", fontWeight:700 }}>{fmtL(result.totalTax)}</div>
                    </div>
                  </div>
                  {Math.abs(result.altSaving) > 1000 && (
                    <div style={{ marginTop:"14px", background:"rgba(255,255,255,0.15)", borderRadius:"8px", padding:"10px 14px", fontSize:"12px", color:"white" }}>
                      {result.altSaving < 0 ? `💡 Switch to ${result.altRegime} regime — save ${fmtINR(Math.abs(result.altSaving))} more per year` : `✓ ${inp.regime==="new"?"New":"Old"} regime saves ${fmtINR(Math.abs(result.altSaving))} vs ${result.altRegime} regime`}
                    </div>
                  )}
                  {result.taxableIncome <= (inp.regime==="new"?700000:500000) && (
                    <div style={{ marginTop:"10px", background:"rgba(255,255,255,0.15)", borderRadius:"8px", padding:"10px 14px", fontSize:"12px", color:"white" }}>
                      ✓ 87A rebate — zero income tax since taxable income ≤ {inp.regime==="new"?"₹7L":"₹5L"}
                    </div>
                  )}
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px", marginBottom:"14px" }}>
                  {[
                    { label:"Taxable income",    val:fmtL(result.taxableIncome), color:"#3B82F6" },
                    { label:"Income tax + cess", val:fmtL(result.totalTax),      color:"#EF4444" },
                    { label:"Employer PF + Gratuity", val:fmtINR(result.emplrPF+result.gratuity), color:"#F59E0B" },
                  ].map((s,i) => (
                    <div key={i} style={{ background:"white", border:"1.5px solid var(--border)", borderRadius:"var(--radius)", padding:"14px 16px", borderTop:`3px solid ${s.color}` }}>
                      <div style={{ fontSize:"10px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"var(--ink3)", marginBottom:"6px" }}>{s.label}</div>
                      <div style={{ fontFamily:"var(--fraunces)", fontSize:"1.1rem", fontWeight:700, color:s.color }}>{s.val}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background:"white", border:"1.5px solid var(--border)", borderRadius:"var(--radius-lg)", padding:"20px 24px", marginBottom:"14px" }}>
                  <h2 style={{ fontFamily:"var(--fraunces)", fontSize:"1rem", fontWeight:700, color:"var(--ink)", marginBottom:"16px" }}>Monthly breakdown</h2>
                  <BarRow label="Basic salary"          value={result.monthlyBasic}   max={result.monthlyGross} color="var(--teal)" />
                  <BarRow label="HRA"                   value={result.monthlyHra}     max={result.monthlyGross} color="#60A5FA" />
                  <BarRow label="Special allowance"     value={result.monthlySpecial} max={result.monthlyGross} color="#A78BFA" />
                  <BarRow label="Leave travel allowance" value={result.monthlyLta}    max={result.monthlyGross} color="#C084FC" />
                  <div style={{ borderTop:"1px solid var(--border)", margin:"12px 0" }} />
                  <BarRow label="PF deduction"    value={result.monthlyEmpPF}  max={result.monthlyGross} color="#F59E0B" negative />
                  <BarRow label="Professional tax" value={result.monthlyProfTax} max={result.monthlyGross} color="#F59E0B" negative />
                  <BarRow label="TDS (income tax)" value={result.monthlyTax}   max={result.monthlyGross} color="#EF4444" negative />
                  <div style={{ borderTop:"1.5px solid var(--teal)", margin:"12px 0" }} />
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:"14px", fontWeight:700, color:"var(--ink)" }}>Net monthly in-hand</span>
                    <span style={{ fontFamily:"var(--fraunces)", fontSize:"1.3rem", fontWeight:700, color:"var(--teal)" }}>{fmtINR(result.monthly)}</span>
                  </div>
                </div>

                <div style={{ background:"white", border:"1.5px solid var(--border)", borderRadius:"var(--radius-lg)", overflow:"hidden", marginBottom:"14px" }}>
                  <div style={{ padding:"14px 20px", background:"var(--off)", borderBottom:"1px solid var(--border)" }}>
                    <h2 style={{ fontFamily:"var(--fraunces)", fontSize:"1rem", fontWeight:700, color:"var(--ink)" }}>Annual salary structure</h2>
                  </div>
                  {[
                    { label:"Gross CTC",               val:result.ctc,                               neg:false },
                    { label:"Less: Employer PF",        val:result.emplrPF,                           neg:true  },
                    { label:"Less: Gratuity",           val:result.gratuity,                          neg:true  },
                    { label:"Gross salary",             val:result.ctc-result.emplrPF-result.gratuity, neg:false, muted:true },
                    { label:"Less: Employee PF",        val:result.empPF,                             neg:true  },
                    { label:"Less: Professional tax",   val:result.profTax,                           neg:true  },
                    { label:"Less: Income tax + cess",  val:result.totalTax,                          neg:true  },
                    { label:"Net annual take-home",     val:result.annualNet,                         neg:false, bold:true },
                  ].map((r,i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"11px 20px", borderBottom:i<7?"1px solid var(--off)":"none", background:r.bold?"var(--teal-light)":"white" }}>
                      <span style={{ fontSize:"13px", color:r.bold?"var(--teal-dark)":r.muted?"var(--ink2)":"var(--ink2)", fontWeight:r.bold?700:400 }}>{r.label}</span>
                      <span style={{ fontFamily:"var(--fraunces)", fontSize:"13px", fontWeight:r.bold?700:400, color:r.bold?"var(--teal-dark)":r.neg?"#EF4444":"var(--ink)" }}>
                        {r.neg?"−":""}{fmtINR(r.val)}
                      </span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize:"11px", color:"var(--ink3)", lineHeight:1.7 }}>
                  <strong>Disclaimer:</strong> Estimates based on 40% basic / 20% HRA structure. Actual figures vary by company policy and individual investments. Consult a CA for precise calculations.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer onCalc={() => {}} onHome={onBack} />
    </div>
  );
}
