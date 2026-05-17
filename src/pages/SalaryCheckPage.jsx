import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SALARY_DATA, ROLES, CITIES, EXPERIENCES } from "../data/salaryData";
import { calculate, fmtINR, fmtL } from "../data/taxEngine";

function RangeBar({ min, median, max, userVal }) {
  const total  = max - min || 1;
  const medPct = ((median - min) / total) * 100;
  const userPct = userVal != null ? Math.min(100, Math.max(0, ((userVal - min) / total) * 100)) : null;
  return (
    <div style={{ margin:"20px 0 8px" }}>
      <div style={{ position:"relative", height:"14px", background:"#E5E7EB", borderRadius:"99px" }}>
        <div style={{ position:"absolute", left:0, width:medPct+"%", height:"100%", background:"linear-gradient(90deg,var(--teal-light),var(--teal))", borderRadius:"99px" }} />
        <div style={{ position:"absolute", left:medPct+"%", top:"50%", transform:"translate(-50%,-50%)", width:"20px", height:"20px", background:"var(--teal)", borderRadius:"50%", border:"3px solid white", boxShadow:"0 2px 8px rgba(13,148,136,0.35)", zIndex:2 }} />
        {userPct != null && (
          <div style={{ position:"absolute", left:userPct+"%", top:"50%", transform:"translate(-50%,-50%)", width:"20px", height:"20px", background:"var(--gold)", borderRadius:"50%", border:"3px solid white", boxShadow:"0 2px 8px rgba(245,158,11,0.35)", zIndex:3 }} />
        )}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:"8px", fontSize:"12px", color:"var(--ink3)" }}>
        <span>₹{min}L <span style={{ fontSize:"10px" }}>min</span></span>
        <span style={{ color:"var(--teal)", fontWeight:700 }}>₹{median}L <span style={{ fontSize:"10px", fontWeight:400 }}>median</span></span>
        <span>₹{max}L <span style={{ fontSize:"10px" }}>max</span></span>
      </div>
      {userPct != null && <div style={{ textAlign:"center", fontSize:"12px", color:"var(--gold,#D97706)", fontWeight:700, marginTop:"4px" }}>▲ Your salary: ₹{userVal}L</div>}
    </div>
  );
}

function Verdict({ userVal, cityData }) {
  if (!userVal || !cityData) return null;
  const { min, median, max } = cityData;
  const pct  = Math.round((userVal / median) * 100);
  const gap  = (median - userVal).toFixed(1);
  let label, color, bg, icon, advice;
  if (userVal < min) {
    label="Well below market"; color="#991B1B"; bg="#FEE2E2"; icon="⚠️";
    advice=`You're earning ${100-pct}% less than the minimum market rate. Strongly consider upskilling or switching companies.`;
  } else if (pct < 85) {
    label="Below market rate"; color="#B45309"; bg="#FEF3C7"; icon="📉";
    advice=`You're ${100-pct}% below the market median. Raise conversation or explore other offers — you have room to negotiate.`;
  } else if (pct <= 115) {
    label="At market rate"; color="var(--teal-dark)"; bg="var(--teal-light)"; icon="✅";
    advice="You're being paid fairly for your role. Focus on growing skills and responsibilities to get into the 'above market' bracket.";
  } else if (userVal <= max) {
    label="Above market rate"; color="#065F46"; bg="#D1FAE5"; icon="🚀";
    advice="You're earning above median. Great positioning — ensure you're being compensated for your skills and not just tenure.";
  } else {
    label="Top of market"; color="#065F46"; bg="#D1FAE5"; icon="🏆";
    advice="You're in the top salary bracket for this role. Focus on equity, bonuses, and your next level.";
  }
  return (
    <div style={{ background:bg, borderRadius:"12px", padding:"20px 22px", marginTop:"20px", border:`1px solid ${color}33` }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:"12px" }}>
        <span style={{ fontSize:"24px", flexShrink:0 }}>{icon}</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:"17px", fontWeight:700, color, marginBottom:"4px" }}>{label}</div>
          <div style={{ fontSize:"13px", color, opacity:0.85, lineHeight:1.6, marginBottom:"12px" }}>{advice}</div>
          <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
            <div>
              <div style={{ fontSize:"10px", fontWeight:700, color, textTransform:"uppercase", letterSpacing:"0.06em", opacity:0.7 }}>Your salary</div>
              <div style={{ fontFamily:"var(--fraunces)", fontSize:"1.3rem", fontWeight:700, color }}>₹{userVal}L</div>
            </div>
            <div>
              <div style={{ fontSize:"10px", fontWeight:700, color, textTransform:"uppercase", letterSpacing:"0.06em", opacity:0.7 }}>Market median</div>
              <div style={{ fontFamily:"var(--fraunces)", fontSize:"1.3rem", fontWeight:700, color }}>₹{median}L</div>
            </div>
            {userVal < median && (
              <div>
                <div style={{ fontSize:"10px", fontWeight:700, color, textTransform:"uppercase", letterSpacing:"0.06em", opacity:0.7 }}>Potential raise</div>
                <div style={{ fontFamily:"var(--fraunces)", fontSize:"1.3rem", fontWeight:700, color }}>₹{gap}L/yr</div>
              </div>
            )}
            <div>
              <div style={{ fontSize:"10px", fontWeight:700, color, textTransform:"uppercase", letterSpacing:"0.06em", opacity:0.7 }}>vs median</div>
              <div style={{ fontFamily:"var(--fraunces)", fontSize:"1.3rem", fontWeight:700, color }}>{pct}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SalaryCheckPage({ onBack, onCalc }) {
  const [role,     setRole]     = useState("");
  const [city,     setCity]     = useState("All India");
  const [exp,      setExp]      = useState("");
  const [mySalary, setMySalary] = useState("");
  const [checked,  setChecked]  = useState(false);

  // also compute in-hand from their salary
  const inHandResult = useMemo(() => {
    const ctc = parseFloat(mySalary);
    if (!ctc || ctc <= 0) return null;
    return calculate({ ctcL:ctc, cityTier:"tier1", rentPaidL:0, homeLoanInterestL:0, section80cL:0, npsL:0, medicalL:0, regime:"new" });
  }, [mySalary]);

  const roleData = role ? SALARY_DATA[role] : null;
  const cityData = roleData && (roleData[city] || roleData["All India"]);

  const handleCheck = () => { if (role && mySalary) setChecked(true); };

  return (
    <div style={{ background:"var(--off)", minHeight:"100vh" }}>
      <Navbar onHome={onBack} onCalc={onCalc} onCheck={() => {}} />
      <div style={{ paddingTop:"var(--nav-h)", maxWidth:"820px", margin:"0 auto", padding:"calc(var(--nav-h) + 32px) 5% 80px" }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:"var(--ink3)", fontSize:"13px", fontWeight:600, cursor:"pointer", marginBottom:"20px", display:"flex", alignItems:"center", gap:"4px" }}>← Home</button>

        <div style={{ marginBottom:"28px" }}>
          <h1 style={{ fontFamily:"var(--fraunces)", fontSize:"clamp(1.8rem,3vw,2.4rem)", fontWeight:700, color:"var(--ink)", marginBottom:"6px" }}>Am I Being Paid Fairly?</h1>
          <p style={{ fontSize:"14px", color:"var(--ink3)" }}>Enter your details to instantly see where your salary stands vs the Indian market in 2026.</p>
        </div>

        {/* Input card */}
        <div style={{ background:"white", border:"1.5px solid var(--border)", borderRadius:"var(--radius-lg)", padding:"24px 28px", marginBottom:"20px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"16px" }}>
            <div>
              <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"6px" }}>Your role</label>
              <select value={role} onChange={e => { setRole(e.target.value); setChecked(false); }} style={{ appearance:"none", backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center", paddingRight:"34px" }}>
                <option value="">Select your role...</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"6px" }}>City</label>
              <select value={city} onChange={e => { setCity(e.target.value); setChecked(false); }} style={{ appearance:"none", backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center", paddingRight:"34px" }}>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"20px" }}>
            <div>
              <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"6px" }}>Experience</label>
              <select value={exp} onChange={e => setExp(e.target.value)} style={{ appearance:"none", backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center", paddingRight:"34px" }}>
                <option value="">Any level</option>
                {EXPERIENCES.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"6px" }}>Your current CTC (₹ Lakhs/yr)</label>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", fontSize:"12px", color:"var(--ink3)", fontWeight:600 }}>₹L</span>
                <input type="number" value={mySalary} onChange={e => { setMySalary(e.target.value); setChecked(false); }} placeholder="e.g. 12" min="0" step="0.5" style={{ paddingLeft:"38px", fontWeight:600 }} />
              </div>
            </div>
          </div>
          <button onClick={handleCheck} disabled={!role || !mySalary} style={{ width:"100%", padding:"14px", background:(!role||!mySalary)?"var(--border)":"var(--teal)", color:(!role||!mySalary)?"var(--ink3)":"white", border:"none", borderRadius:"10px", fontSize:"15px", fontWeight:700, cursor:(!role||!mySalary)?"not-allowed":"pointer", transition:"all 0.15s" }}>
            Check My Salary →
          </button>
        </div>

        {/* Results */}
        {checked && cityData && (
          <>
            {/* Market range */}
            <div style={{ background:"white", border:"1.5px solid var(--border)", borderRadius:"var(--radius-lg)", padding:"24px 28px", marginBottom:"16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"10px" }}>
                <div>
                  <h2 style={{ fontFamily:"var(--fraunces)", fontSize:"1.2rem", fontWeight:700, color:"var(--ink)", marginBottom:"3px" }}>{role} — {city}</h2>
                  <p style={{ fontSize:"13px", color:"var(--ink3)" }}>Based on {cityData.sample.toLocaleString()} salary data points · 2026</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:"11px", color:"var(--ink3)", marginBottom:"2px" }}>YoY growth</div>
                  <div style={{ fontFamily:"var(--fraunces)", fontSize:"1.4rem", fontWeight:700, color:"var(--green,#10B981)" }}>+{cityData.yoy}%</div>
                </div>
              </div>
              <RangeBar min={cityData.min} median={cityData.median} max={cityData.max} userVal={parseFloat(mySalary)} />
              <Verdict userVal={parseFloat(mySalary)} cityData={cityData} />
            </div>

            {/* In-hand from their salary */}
            {inHandResult && (
              <div style={{ background:"white", border:"1.5px solid var(--border)", borderRadius:"var(--radius-lg)", padding:"24px 28px", marginBottom:"16px" }}>
                <h2 style={{ fontFamily:"var(--fraunces)", fontSize:"1.1rem", fontWeight:700, color:"var(--ink)", marginBottom:"14px" }}>Your monthly in-hand at ₹{mySalary}L CTC</h2>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:"12px" }}>
                  {[
                    { label:"Monthly in-hand", val:fmtINR(inHandResult.monthly), color:"var(--teal-dark)", bg:"var(--teal-light)" },
                    { label:"Annual take-home", val:fmtINR(inHandResult.annualNet), color:"var(--teal-dark)", bg:"var(--teal-light)" },
                    { label:"Income tax/year", val:fmtL(inHandResult.totalTax), color:"#991B1B", bg:"#FEE2E2" },
                    { label:"Effective tax rate", val:inHandResult.effectiveRate.toFixed(1)+"%", color:"#92400E", bg:"#FEF3C7" },
                  ].map((s,i) => (
                    <div key={i} style={{ background:s.bg, borderRadius:"10px", padding:"14px 16px", textAlign:"center" }}>
                      <div style={{ fontSize:"10px", fontWeight:700, color:s.color, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:"6px", opacity:0.8 }}>{s.label}</div>
                      <div style={{ fontFamily:"var(--fraunces)", fontSize:"1.15rem", fontWeight:700, color:s.color }}>{s.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:"14px", textAlign:"right" }}>
                  <button onClick={onCalc} style={{ background:"none", border:"none", color:"var(--teal-dark)", fontSize:"13px", fontWeight:600, cursor:"pointer" }}>
                    Full tax calculation with deductions →
                  </button>
                </div>
              </div>
            )}

            {/* City comparison */}
            {roleData && Object.keys(roleData).length > 1 && (
              <div style={{ background:"white", border:"1.5px solid var(--border)", borderRadius:"var(--radius-lg)", padding:"24px 28px", marginBottom:"16px" }}>
                <h2 style={{ fontFamily:"var(--fraunces)", fontSize:"1.1rem", fontWeight:700, color:"var(--ink)", marginBottom:"16px" }}>How {role} salaries compare across cities</h2>
                {Object.entries(roleData).filter(([c]) => c !== "All India").sort(([,a],[,b]) => b.median - a.median).map(([c, d]) => {
                  const maxMed = Math.max(...Object.values(roleData).map(v => v.median));
                  const pct = (d.median / maxMed) * 100;
                  return (
                    <div key={c} style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"10px" }}>
                      <div style={{ width:"90px", fontSize:"13px", fontWeight:500, color:c===city?"var(--teal-dark)":"var(--ink2)", flexShrink:0 }}>{c}</div>
                      <div style={{ flex:1, height:"8px", background:"#F3F4F6", borderRadius:"99px", overflow:"hidden" }}>
                        <div style={{ width:pct+"%", height:"100%", background:c===city?"var(--teal)":"#D1D5DB", borderRadius:"99px", transition:"width 0.6s ease" }} />
                      </div>
                      <div style={{ width:"55px", fontSize:"13px", fontWeight:700, color:c===city?"var(--teal)":"var(--ink)", textAlign:"right" }}>₹{d.median}L</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Negotiation tips */}
            <div style={{ background:"var(--teal-light)", border:"1px solid rgba(13,148,136,0.25)", borderRadius:"var(--radius-lg)", padding:"20px 24px" }}>
              <h3 style={{ fontFamily:"var(--fraunces)", fontSize:"1rem", fontWeight:700, color:"var(--teal-dark)", marginBottom:"12px" }}>💼 Salary negotiation tips for {role}s</h3>
              {[
                "Always negotiate — 85% of employers expect it. Saying nothing leaves money on the table.",
                "Quote the upper range, not the median. 'Market rate is ₹'+cityData.max+'L — I'm looking for ₹'+(cityData.max*0.9).toFixed(0)+'L' is a strong opener.",
                `Mention certifications, AI tools, or specialisations — these command 15–30% premiums in India in 2026.`,
                "Get competing offers if possible. Nothing accelerates a raise faster than a real offer letter.",
                "Negotiate joining bonus, WFH flexibility, and stock options — these add 10–25% to total comp.",
              ].map((tip, i) => (
                <div key={i} style={{ display:"flex", gap:"10px", marginBottom:"8px" }}>
                  <span style={{ color:"var(--teal)", fontWeight:700, flexShrink:0 }}>{i+1}.</span>
                  <p style={{ fontSize:"13px", color:"var(--teal-dark)", lineHeight:1.6, margin:0 }}>
                    {i===1 ? `Always quote the upper range, not the median. "Market rate is ₹${cityData.max}L — I'm looking for ₹${(cityData.max*0.9).toFixed(0)}L" is a strong opener.` : tip}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {checked && !cityData && (
          <div style={{ background:"white", border:"1.5px solid var(--border)", borderRadius:"var(--radius-lg)", padding:"40px", textAlign:"center" }}>
            <div style={{ fontSize:"32px", marginBottom:"12px" }}>🔍</div>
            <p style={{ color:"var(--ink3)", fontSize:"14px" }}>No specific data for {city} for this role. Try selecting "All India" for a broader view.</p>
          </div>
        )}
      </div>
      <Footer onCalc={onCalc} onHome={onBack} />
    </div>
  );
}
