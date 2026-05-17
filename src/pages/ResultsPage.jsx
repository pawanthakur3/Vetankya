import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { SALARY_DATA, COMPANY_DATA } from "../data/salaryData";

function RangeBar({ min, median, max, userVal }) {
  const total = max - min;
  const medPct = ((median - min) / total) * 100;
  const userPct = userVal ? Math.min(100, Math.max(0, ((userVal - min) / total) * 100)) : null;
  return (
    <div style={{ position:"relative", margin:"24px 0" }}>
      <div style={{ position:"relative", height:"12px", background:"#E5E7EB", borderRadius:"99px", overflow:"visible" }}>
        <div style={{ position:"absolute", left:0, width:medPct+"%", height:"100%", background:"linear-gradient(90deg, #CCFBF1, #0D9488)", borderRadius:"99px" }} />
        <div style={{ position:"absolute", left:medPct+"%", top:"50%", transform:"translate(-50%,-50%)", width:"18px", height:"18px", background:"var(--teal)", borderRadius:"50%", border:"3px solid white", boxShadow:"0 2px 8px rgba(13,148,136,0.4)", zIndex:2 }} />
        {userPct !== null && (
          <div style={{ position:"absolute", left:userPct+"%", top:"50%", transform:"translate(-50%,-50%)", width:"18px", height:"18px", background:"var(--gold)", borderRadius:"50%", border:"3px solid white", boxShadow:"0 2px 8px rgba(245,158,11,0.4)", zIndex:3 }} />
        )}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:"10px", fontSize:"13px", color:"var(--ink3)", fontWeight:500 }}>
        <span>₹{min}L <span style={{ fontSize:"11px" }}>min</span></span>
        <span style={{ color:"var(--teal)", fontWeight:700 }}>₹{median}L <span style={{ fontSize:"11px", fontWeight:500 }}>median</span></span>
        <span>₹{max}L <span style={{ fontSize:"11px" }}>max</span></span>
      </div>
      {userPct !== null && (
        <div style={{ textAlign:"center", marginTop:"8px", fontSize:"12px", color:"var(--gold)", fontWeight:700 }}>▲ You: ₹{userVal}L</div>
      )}
    </div>
  );
}

export default function ResultsPage({ search, onBack, onCompany, onCalc }) {
  const [mySalary, setMySalary] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitRole, setSubmitRole] = useState(search.role);
  const [submitSal, setSubmitSal]   = useState("");
  const [submitExp, setSubmitExp]   = useState("");
  const [submitCity, setSubmitCity] = useState(search.city);
  const [submitDone, setSubmitDone] = useState(false);

  const roleData = SALARY_DATA[search.role];
  const cityData = roleData && (roleData[search.city] || roleData["All India"]);
  const userVal  = parseFloat(mySalary) || null;

  const verdict = () => {
    if (!userVal || !cityData) return null;
    const { min, median, max } = cityData;
    if (userVal < min)    return { text:"Well below market", color:"var(--red)",   bg:"var(--red-light)",   pct: Math.round((userVal/median)*100) };
    if (userVal < median * 0.85) return { text:"Below market rate", color:"#D97706", bg:"var(--gold-light)", pct: Math.round((userVal/median)*100) };
    if (userVal <= median * 1.15) return { text:"At market rate", color:"var(--teal)", bg:"var(--teal-light)", pct: Math.round((userVal/median)*100) };
    if (userVal <= max)   return { text:"Above market rate", color:"var(--green)", bg:"var(--green-light)", pct: Math.round((userVal/median)*100) };
    return { text:"Top of market", color:"var(--teal-dark)", bg:"var(--teal-light)", pct: Math.round((userVal/median)*100) };
  };
  const v = verdict();

  const relatedCompanies = Object.entries(COMPANY_DATA).filter(([, d]) =>
    d.roles.some(r => r.title.toLowerCase().includes(search.role.toLowerCase().split(" ")[0]))
  ).slice(0, 4);

  return (
    <div style={{ background:"var(--off)", minHeight:"100vh" }}>
      <Navbar onHome={onBack} onCalc={onCalc} />

      <div style={{ paddingTop:"var(--nav-h)" }}>
        {/* Search bar strip */}
        <div style={{ background:"white", borderBottom:"1px solid var(--border)", padding:"16px 5%" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <SearchBar onSearch={(s) => { window.location.reload(); }} />
          </div>
        </div>

        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"32px 5% 60px", display:"grid", gridTemplateColumns:"1fr 340px", gap:"28px", alignItems:"start" }}>

          {/* LEFT */}
          <div>
            {/* Header */}
            <div style={{ background:"white", borderRadius:"var(--radius-lg)", border:"1.5px solid var(--border)", padding:"28px 32px", marginBottom:"20px" }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"12px", marginBottom:"20px" }}>
                <div>
                  <button onClick={onBack} style={{ background:"none", border:"none", color:"var(--ink3)", fontSize:"13px", fontWeight:600, cursor:"pointer", marginBottom:"8px", display:"flex", alignItems:"center", gap:"4px" }}>← Back</button>
                  <h1 style={{ fontFamily:"var(--fraunces)", fontSize:"1.8rem", fontWeight:700, color:"var(--ink)", marginBottom:"6px" }}>{search.role}</h1>
                  <p style={{ fontSize:"14px", color:"var(--ink3)" }}>
                    {search.city} {search.exp && "· "+search.exp}
                    {cityData && <span style={{ marginLeft:"12px", background:"var(--teal-light)", color:"var(--teal-dark)", fontSize:"12px", fontWeight:600, padding:"3px 10px", borderRadius:"99px" }}>{cityData.sample.toLocaleString()} data points</span>}
                  </p>
                </div>
                {cityData && (
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:"12px", color:"var(--ink3)", marginBottom:"2px" }}>Median salary</div>
                    <div style={{ fontFamily:"var(--fraunces)", fontSize:"2.4rem", fontWeight:700, color:"var(--teal)", lineHeight:1 }}>₹{cityData.median}L</div>
                    <div style={{ fontSize:"12px", color:"var(--green)", fontWeight:600, marginTop:"4px" }}>↑ {cityData.yoy}% vs last year</div>
                  </div>
                )}
              </div>

              {cityData ? (
                <>
                  <RangeBar min={cityData.min} median={cityData.median} max={cityData.max} userVal={userVal} />
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px" }}>
                    {[
                      { label:"Entry level", val:cityData.min+"L", sub:"0-2 years" },
                      { label:"Mid level",   val:cityData.median+"L", sub:"3-6 years" },
                      { label:"Senior",      val:cityData.max+"L", sub:"7+ years" },
                    ].map((s,i) => (
                      <div key={i} style={{ background:"var(--off)", borderRadius:"10px", padding:"14px 16px", textAlign:"center" }}>
                        <div style={{ fontSize:"11px", color:"var(--ink3)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:"6px" }}>{s.label}</div>
                        <div style={{ fontFamily:"var(--fraunces)", fontSize:"1.4rem", fontWeight:700, color:"var(--ink)" }}>₹{s.val}</div>
                        <div style={{ fontSize:"11px", color:"var(--ink3)", marginTop:"2px" }}>{s.sub}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ padding:"32px", textAlign:"center", color:"var(--ink3)" }}>
                  <div style={{ fontSize:"32px", marginBottom:"12px" }}>🔍</div>
                  <p>No specific data for {search.city}. Try "All India" for a broader view.</p>
                </div>
              )}
            </div>

            {/* Am I underpaid? */}
            <div style={{ background:"white", borderRadius:"var(--radius-lg)", border:"1.5px solid var(--border)", padding:"24px 28px", marginBottom:"20px" }}>
              <h2 style={{ fontFamily:"var(--fraunces)", fontSize:"1.2rem", fontWeight:700, color:"var(--ink)", marginBottom:"6px" }}>Am I being paid fairly?</h2>
              <p style={{ fontSize:"13px", color:"var(--ink3)", marginBottom:"16px" }}>Enter your current CTC to see where you stand vs. the market.</p>
              <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                <div style={{ position:"relative", flex:1 }}>
                  <input type="number" value={mySalary} onChange={e => setMySalary(e.target.value)} placeholder="e.g. 12" style={{ paddingLeft:"36px" }} />
                  <span style={{ position:"absolute", left:"13px", top:"50%", transform:"translateY(-50%)", fontSize:"13px", color:"var(--ink3)", fontWeight:600 }}>₹L</span>
                </div>
                <span style={{ fontSize:"13px", color:"var(--ink3)", whiteSpace:"nowrap" }}>per year (CTC)</span>
              </div>
              {v && (
                <div style={{ marginTop:"16px", padding:"16px 20px", background:v.bg, borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontSize:"16px", fontWeight:700, color:v.color }}>{v.text}</div>
                    <div style={{ fontSize:"13px", color:v.color, opacity:0.8, marginTop:"2px" }}>You earn {v.pct}% of the median salary for this role</div>
                  </div>
                  {v.pct < 90 && (
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:"11px", color:v.color, fontWeight:600 }}>Potential raise</div>
                      <div style={{ fontFamily:"var(--fraunces)", fontSize:"1.3rem", fontWeight:700, color:v.color }}>₹{(cityData.median - parseFloat(mySalary)).toFixed(1)}L</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* City comparison */}
            {roleData && (
              <div style={{ background:"white", borderRadius:"var(--radius-lg)", border:"1.5px solid var(--border)", padding:"24px 28px", marginBottom:"20px" }}>
                <h2 style={{ fontFamily:"var(--fraunces)", fontSize:"1.2rem", fontWeight:700, color:"var(--ink)", marginBottom:"16px" }}>Salary by city</h2>
                {Object.entries(roleData).filter(([c]) => c !== "All India").map(([city, d]) => {
                  const pct = (d.median / (roleData["Bengaluru"]?.median || d.median)) * 100;
                  return (
                    <div key={city} style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"12px" }}>
                      <div style={{ width:"100px", fontSize:"13px", fontWeight:500, color:"var(--ink2)", flexShrink:0 }}>{city}</div>
                      <div style={{ flex:1, height:"8px", background:"#F3F4F6", borderRadius:"99px", overflow:"hidden" }}>
                        <div style={{ width:Math.min(100,pct)+"%", height:"100%", background: city === search.city ? "var(--teal)" : "#9CA3AF", borderRadius:"99px", transition:"width 0.5s" }} />
                      </div>
                      <div style={{ width:"60px", fontSize:"13px", fontWeight:700, color: city === search.city ? "var(--teal)" : "var(--ink)", textAlign:"right" }}>₹{d.median}L</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Companies hiring */}
            {relatedCompanies.length > 0 && (
              <div style={{ background:"white", borderRadius:"var(--radius-lg)", border:"1.5px solid var(--border)", padding:"24px 28px" }}>
                <h2 style={{ fontFamily:"var(--fraunces)", fontSize:"1.2rem", fontWeight:700, color:"var(--ink)", marginBottom:"16px" }}>Companies hiring for this role</h2>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                  {relatedCompanies.map(([name, d]) => (
                    <div key={name} onClick={() => onCompany(name)} style={{ border:"1.5px solid var(--border)", borderRadius:"10px", padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:"12px", transition:"all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor="var(--teal)"; e.currentTarget.style.background="var(--teal-light)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.background="white"; }}
                    >
                      <div style={{ width:"36px", height:"36px", borderRadius:"8px", background:"var(--teal-light)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px", fontWeight:800, color:"var(--teal-dark)", fontFamily:"var(--fraunces)", flexShrink:0 }}>{name[0]}</div>
                      <div>
                        <div style={{ fontSize:"13px", fontWeight:700, color:"var(--ink)" }}>{name}</div>
                        <div style={{ fontSize:"11px", color:"var(--ink3)" }}>{d.hq} · ★ {d.rating}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div>
            {/* Submit salary */}
            <div style={{ background:"var(--teal)", borderRadius:"var(--radius-lg)", padding:"24px", marginBottom:"16px", color:"white" }}>
              <div style={{ fontSize:"22px", marginBottom:"8px" }}>💰</div>
              <h3 style={{ fontFamily:"var(--fraunces)", fontSize:"1.15rem", fontWeight:700, marginBottom:"8px" }}>Share your salary anonymously</h3>
              <p style={{ fontSize:"13px", opacity:0.85, marginBottom:"18px", lineHeight:1.6 }}>Help fellow professionals. Your data is 100% anonymous and makes the tool more accurate for everyone.</p>
              {!submitDone ? (
                <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                  <input value={submitSal} onChange={e => setSubmitSal(e.target.value)} placeholder="Your CTC (e.g. 12)" style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", color:"white", borderRadius:"7px" }} />
                  <input value={submitExp} onChange={e => setSubmitExp(e.target.value)} placeholder="Years of experience" style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", color:"white", borderRadius:"7px" }} />
                  <button onClick={() => setSubmitDone(true)} style={{ background:"white", color:"var(--teal-dark)", border:"none", padding:"11px", borderRadius:"7px", fontSize:"14px", fontWeight:700, cursor:"pointer" }}>
                    Submit Anonymously
                  </button>
                </div>
              ) : (
                <div style={{ background:"rgba(255,255,255,0.15)", borderRadius:"10px", padding:"16px", textAlign:"center" }}>
                  <div style={{ fontSize:"24px", marginBottom:"8px" }}>🙏</div>
                  <div style={{ fontSize:"14px", fontWeight:600 }}>Thank you! Your data helps thousands of professionals negotiate better.</div>
                </div>
              )}
            </div>

            {/* Key facts */}
            <div style={{ background:"white", borderRadius:"var(--radius-lg)", border:"1.5px solid var(--border)", padding:"20px", marginBottom:"16px" }}>
              <h3 style={{ fontSize:"14px", fontWeight:700, color:"var(--ink)", marginBottom:"14px" }}>Key salary facts</h3>
              {cityData && [
                { label:"Annual increment", val:"8-15%", icon:"📈" },
                { label:"YoY growth 2026", val:"+"+cityData.yoy+"%", icon:"🚀" },
                { label:"Data points", val:cityData.sample.toLocaleString(), icon:"📊" },
                { label:"Bonus (typical)", val:"10-25% of CTC", icon:"🎁" },
                { label:"WFH premium", val:"+10-20% CTC", icon:"🏠" },
              ].map((f,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 0", borderBottom: i<4 ? "1px solid var(--off)" : "none" }}>
                  <span style={{ fontSize:"13px", color:"var(--ink2)" }}>{f.icon} {f.label}</span>
                  <span style={{ fontSize:"13px", fontWeight:700, color:"var(--teal)" }}>{f.val}</span>
                </div>
              ))}
            </div>

            {/* CTA to resume builder */}
            <div style={{ background:"var(--ink)", borderRadius:"var(--radius-lg)", padding:"20px", color:"white", textAlign:"center" }}>
              <div style={{ fontSize:"20px", marginBottom:"8px" }}>📄</div>
              <h3 style={{ fontFamily:"var(--fraunces)", fontSize:"1rem", fontWeight:700, marginBottom:"8px", fontStyle:"italic" }}>Now get a resume that earns this salary</h3>
              <p style={{ fontSize:"12px", opacity:0.65, marginBottom:"14px", lineHeight:1.6 }}>Build a free ATS-friendly resume on BanaoResume.in</p>
              <a href="https://banaoresume.vercel.app" target="_blank" rel="noopener noreferrer" style={{ display:"block", background:"var(--teal)", color:"white", padding:"11px", borderRadius:"7px", fontSize:"13px", fontWeight:700, textDecoration:"none" }}>
                Build My Resume Free →
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer onCalc={() => {}} onHome={onBack} />
    </div>
  );
}
