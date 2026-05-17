import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { TRENDING, COMPANY_DATA } from "../data/salaryData";

const STATS = [
  { n:"50,000+", label:"Salary data points" },
  { n:"200+",    label:"Roles covered" },
  { n:"15",      label:"Indian cities" },
  { n:"Free",    label:"Always" },
];

const FEATURES = [
  { icon:"🎯", title:"Role + city specific", desc:"Not vague national averages. Get salary data for your exact role in your exact city." },
  { icon:"🏢", title:"Company salary pages", desc:"See what TCS, Amazon, Flipkart and 50+ companies pay for every role." },
  { icon:"📊", title:"CTC to in-hand", desc:"Know your actual take-home after PF, tax, HRA — the most searched tool in India." },
  { icon:"📈", title:"Year-on-year trends", desc:"See which roles are growing fastest so you can make smarter career moves." },
  { icon:"🔍", title:"Am I underpaid?", desc:"Enter your current salary and instantly see where you stand vs. the market." },
  { icon:"🇮🇳", title:"Tier-2 city data", desc:"Pune, Jaipur, Indore, Kochi — not just metros. We cover where India actually works." },
];

export default function LandingPage({ onSearch, onCompany, onCalc, onCheck }) {
  return (
    <div style={{ background:"var(--white)" }}>
      <Navbar onHome={() => {}} onCalc={onCalc} onCheck={onCheck} transparent />

      {/* HERO */}
      <section style={{
        minHeight:"100vh",
        background:"linear-gradient(160deg, #F0FDFB 0%, #F7F6F2 45%, #FFF9F0 100%)",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        padding:"calc(var(--nav-h) + 48px) 5% 72px",
        textAlign:"center", position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:"15%", left:"8%", width:"320px", height:"320px", background:"radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"20%", right:"8%", width:"260px", height:"260px", background:"radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />

        <div className="fade-up" style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"var(--teal-light)", color:"var(--teal-dark)", padding:"6px 16px", borderRadius:"99px", fontSize:"13px", fontWeight:600, marginBottom:"24px", border:"1px solid rgba(13,148,136,0.25)" }}>
          <span>🇮🇳</span> India's most transparent salary data — completely free
        </div>

        <h1 className="fade-up-2" style={{ fontFamily:"var(--fraunces)", fontSize:"clamp(2.4rem,5vw,4.2rem)", fontWeight:700, lineHeight:1.12, color:"var(--ink)", maxWidth:"820px", marginBottom:"20px" }}>
          Find Out Exactly{" "}
          <span style={{ color:"var(--teal)", fontStyle:"italic" }}>What You Should Earn</span>
          {" "}in India
        </h1>

        <p className="fade-up-3" style={{ fontSize:"clamp(1rem,2vw,1.2rem)", color:"var(--ink2)", maxWidth:"560px", marginBottom:"40px", lineHeight:1.7 }}>
          Compare salaries by role, city, and experience. Real data from 50,000+ Indian professionals. Know your market value before your next negotiation.
        </p>

        <div className="fade-up-4" style={{ width:"100%", maxWidth:"860px" }}>
          <SearchBar onSearch={onSearch} large />

        {/* Quick tool cards */}
        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", justifyContent:"center", marginTop:"20px", animation:"fadeUp 0.5s 0.35s ease both", width:"100%", maxWidth:"860px" }}>
          <button onClick={onCheck} style={{ flex:1, minWidth:"240px", background:"white", border:"1.5px solid var(--border)", borderRadius:"12px", padding:"16px 20px", display:"flex", alignItems:"center", gap:"14px", cursor:"pointer", transition:"all 0.15s", textAlign:"left" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--teal)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(13,148,136,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.boxShadow="none"; }}>
            <span style={{ fontSize:"28px", flexShrink:0 }}>🔍</span>
            <div>
              <div style={{ fontSize:"14px", fontWeight:700, color:"var(--ink)", marginBottom:"2px" }}>Am I underpaid?</div>
              <div style={{ fontSize:"12px", color:"var(--ink3)" }}>Compare your salary vs. the market instantly</div>
            </div>
            <span style={{ marginLeft:"auto", color:"var(--teal)", fontSize:"16px", flexShrink:0 }}>→</span>
          </button>
          <button onClick={onCalc} style={{ flex:1, minWidth:"240px", background:"white", border:"1.5px solid var(--border)", borderRadius:"12px", padding:"16px 20px", display:"flex", alignItems:"center", gap:"14px", cursor:"pointer", transition:"all 0.15s", textAlign:"left" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--teal)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(13,148,136,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.boxShadow="none"; }}>
            <span style={{ fontSize:"28px", flexShrink:0 }}>🧮</span>
            <div>
              <div style={{ fontSize:"14px", fontWeight:700, color:"var(--ink)", marginBottom:"2px" }}>CTC → In-Hand Calculator</div>
              <div style={{ fontSize:"12px", color:"var(--ink3)" }}>New vs old regime · Full tax breakdown</div>
            </div>
            <span style={{ marginLeft:"auto", color:"var(--teal)", fontSize:"16px", flexShrink:0 }}>→</span>
          </button>
        </div>

        <div style={{ display:"flex", gap:"32px", flexWrap:"wrap", justifyContent:"center", marginTop:"48px", animation:"fadeUp 0.5s 0.4s ease both" }}>
          {STATS.map((s,i) => (
            <div key={i} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"var(--fraunces)", fontSize:"2rem", fontWeight:700, color:"var(--teal)", lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:"12px", color:"var(--ink3)", fontWeight:500, marginTop:"4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section style={{ padding:"72px 5%", background:"var(--off)" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"32px", flexWrap:"wrap", gap:"12px" }}>
            <div>
              <div style={{ fontSize:"12px", fontWeight:700, color:"var(--teal)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"8px" }}>Trending</div>
              <h2 style={{ fontFamily:"var(--fraunces)", fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, color:"var(--ink)" }}>Fastest growing salaries in 2026</h2>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"14px" }}>
            {TRENDING.map((t,i) => (
              <div key={i} onClick={() => onSearch({ role:t.role, city:t.city, exp:"" })} style={{ background:"white", border:"1.5px solid var(--border)", borderRadius:"12px", padding:"20px", cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="var(--teal)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(13,148,136,0.12)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateY(0)"; }}
              >
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px" }}>
                  <span style={{ fontSize:"13px", fontWeight:700, color:"var(--ink)" }}>{t.role}</span>
                  <span style={{ background:"var(--green-light)", color:"#065F46", fontSize:"11px", fontWeight:700, padding:"3px 8px", borderRadius:"99px" }}>+{t.yoy}%</span>
                </div>
                <div style={{ fontSize:"20px", fontWeight:800, color:"var(--teal)", fontFamily:"var(--fraunces)", marginBottom:"4px" }}>₹{t.median}L</div>
                <div style={{ fontSize:"12px", color:"var(--ink3)" }}>median · {t.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANIES */}
      <section style={{ padding:"72px 5%", background:"var(--white)" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"40px" }}>
            <div style={{ fontSize:"12px", fontWeight:700, color:"var(--teal)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"8px" }}>Company salaries</div>
            <h2 style={{ fontFamily:"var(--fraunces)", fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, color:"var(--ink)" }}>What top companies pay</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"14px" }}>
            {Object.entries(COMPANY_DATA).map(([name, data]) => (
              <div key={name} onClick={() => onCompany(name)} style={{ background:"var(--white)", border:"1.5px solid var(--border)", borderRadius:"12px", padding:"20px 22px", cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="var(--teal)"; e.currentTarget.style.boxShadow="var(--shadow-md)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateY(0)"; }}
              >
                <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"12px" }}>
                  <div style={{ width:"40px", height:"40px", borderRadius:"10px", background:"var(--teal-light)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", fontWeight:800, color:"var(--teal-dark)", fontFamily:"var(--fraunces)" }}>{name[0]}</div>
                  <div>
                    <div style={{ fontSize:"14px", fontWeight:700, color:"var(--ink)" }}>{name}</div>
                    <div style={{ fontSize:"11px", color:"var(--ink3)" }}>{data.hq}</div>
                  </div>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:"12px", color:"var(--ink3)" }}>{data.roles.length} roles tracked</span>
                  <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
                    <span style={{ color:"var(--gold)", fontSize:"13px" }}>★</span>
                    <span style={{ fontSize:"12px", fontWeight:600, color:"var(--ink2)" }}>{data.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR CTA */}
      <section style={{ padding:"72px 5%", background:"linear-gradient(135deg, #0D9488 0%, #0F766E 100%)", textAlign:"center" }}>
        <div style={{ maxWidth:"640px", margin:"0 auto" }}>
          <div style={{ fontSize:"36px", marginBottom:"16px" }}>🧮</div>
          <h2 style={{ fontFamily:"var(--fraunces)", fontSize:"clamp(1.8rem,3vw,2.6rem)", fontWeight:700, color:"white", marginBottom:"14px", fontStyle:"italic" }}>
            CTC to In-Hand Calculator
          </h2>
          <p style={{ fontSize:"16px", color:"rgba(255,255,255,0.8)", marginBottom:"32px", lineHeight:1.7 }}>
            Enter your CTC and instantly see your monthly take-home salary after PF, income tax, HRA, and all deductions. The most searched tool for Indian employees.
          </p>
          <button onClick={onCalc} style={{ background:"white", color:"var(--teal-dark)", border:"none", padding:"16px 36px", borderRadius:"10px", fontSize:"16px", fontWeight:800, cursor:"pointer", boxShadow:"0 4px 20px rgba(0,0,0,0.2)", transition:"all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.2)"; }}
          >
            Calculate My In-Hand Salary →
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"72px 5%", background:"var(--white)" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"44px" }}>
            <div style={{ fontSize:"12px", fontWeight:700, color:"var(--teal)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"8px" }}>Why VetanKya</div>
            <h2 style={{ fontFamily:"var(--fraunces)", fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, color:"var(--ink)" }}>Everything you need to negotiate with confidence</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"18px" }}>
            {FEATURES.map((f,i) => (
              <div key={i} style={{ padding:"24px", borderRadius:"12px", border:"1.5px solid var(--border)", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background="var(--teal-light)"; e.currentTarget.style.borderColor="var(--teal)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="white"; e.currentTarget.style.borderColor="var(--border)"; }}
              >
                <div style={{ fontSize:"26px", marginBottom:"12px" }}>{f.icon}</div>
                <h3 style={{ fontSize:"15px", fontWeight:700, color:"var(--ink)", marginBottom:"7px" }}>{f.title}</h3>
                <p style={{ fontSize:"13px", color:"var(--ink2)", lineHeight:1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onCalc={onCalc} onHome={() => {}} />
    </div>
  );
}
