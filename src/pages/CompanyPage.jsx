import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { COMPANY_DATA } from "../data/salaryData";

export default function CompanyPage({ company, onBack, onSearch }) {
  const data = COMPANY_DATA[company];
  if (!data) return <div>Company not found</div>;

  return (
    <div style={{ background:"var(--off)", minHeight:"100vh" }}>
      <Navbar onHome={onBack} onCalc={() => {}} />
      <div style={{ paddingTop:"var(--nav-h)" }}>
        <div style={{ background:"linear-gradient(135deg, #F0FDFB, #F7F6F2)", borderBottom:"1px solid var(--border)", padding:"40px 5% 36px" }}>
          <div style={{ maxWidth:"900px", margin:"0 auto" }}>
            <button onClick={onBack} style={{ background:"none", border:"none", color:"var(--ink3)", fontSize:"13px", fontWeight:600, cursor:"pointer", marginBottom:"16px", display:"flex", alignItems:"center", gap:"4px" }}>← All companies</button>
            <div style={{ display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
              <div style={{ width:"64px", height:"64px", borderRadius:"14px", background:"var(--teal-light)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"26px", fontWeight:800, color:"var(--teal-dark)", fontFamily:"var(--fraunces)" }}>{company[0]}</div>
              <div>
                <h1 style={{ fontFamily:"var(--fraunces)", fontSize:"2rem", fontWeight:700, color:"var(--ink)", marginBottom:"4px" }}>{company} Salaries</h1>
                <div style={{ display:"flex", alignItems:"center", gap:"16px", flexWrap:"wrap" }}>
                  <span style={{ fontSize:"13px", color:"var(--ink3)" }}>📍 {data.hq}</span>
                  <span style={{ fontSize:"13px", color:"var(--ink3)" }}>👥 {data.employees} employees</span>
                  <span style={{ fontSize:"13px", color:"var(--ink3)", display:"flex", alignItems:"center", gap:"4px" }}>
                    <span style={{ color:"var(--gold)" }}>★</span> {data.rating} rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth:"900px", margin:"0 auto", padding:"32px 5% 60px" }}>
          <div style={{ background:"white", borderRadius:"var(--radius-lg)", border:"1.5px solid var(--border)", overflow:"hidden", marginBottom:"24px" }}>
            <div style={{ padding:"20px 24px", borderBottom:"1px solid var(--border)", background:"var(--off)" }}>
              <h2 style={{ fontFamily:"var(--fraunces)", fontSize:"1.1rem", fontWeight:700, color:"var(--ink)" }}>Salary by role at {company}</h2>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"var(--off)" }}>
                  {["Role","Experience","CTC Range","Action"].map(h => (
                    <th key={h} style={{ padding:"12px 20px", textAlign:"left", fontSize:"11px", fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:"0.06em", borderBottom:"1px solid var(--border)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.roles.map((r, i) => (
                  <tr key={i} style={{ borderBottom: i < data.roles.length-1 ? "1px solid var(--off)" : "none" }}
                    onMouseEnter={e => e.currentTarget.style.background="var(--off)"}
                    onMouseLeave={e => e.currentTarget.style.background="white"}
                  >
                    <td style={{ padding:"16px 20px", fontSize:"14px", fontWeight:600, color:"var(--ink)" }}>{r.title}</td>
                    <td style={{ padding:"16px 20px", fontSize:"13px", color:"var(--ink3)" }}>{r.yoe} yrs</td>
                    <td style={{ padding:"16px 20px" }}>
                      <span style={{ fontFamily:"var(--fraunces)", fontSize:"1.1rem", fontWeight:700, color:"var(--teal)" }}>₹{r.ctc}</span>
                    </td>
                    <td style={{ padding:"16px 20px" }}>
                      <button onClick={() => onSearch({ role:r.title, city:"All India", exp:"" })} style={{ background:"var(--teal-light)", color:"var(--teal-dark)", border:"none", padding:"6px 14px", borderRadius:"6px", fontSize:"12px", fontWeight:700, cursor:"pointer", transition:"all 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.background="var(--teal)"; e.currentTarget.style.color="white"; }}
                        onMouseLeave={e => { e.currentTarget.style.background="var(--teal-light)"; e.currentTarget.style.color="var(--teal-dark)"; }}
                      >
                        Compare →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background:"var(--teal)", borderRadius:"var(--radius-lg)", padding:"24px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px" }}>
            <div style={{ color:"white" }}>
              <h3 style={{ fontFamily:"var(--fraunces)", fontSize:"1.1rem", fontWeight:700, marginBottom:"4px", fontStyle:"italic" }}>Applying to {company}?</h3>
              <p style={{ fontSize:"13px", opacity:0.85 }}>Build an ATS-optimised resume on BanaoResume.in — free, no signup needed.</p>
            </div>
            <a href="https://banaoresume.vercel.app" target="_blank" rel="noopener noreferrer" style={{ background:"white", color:"var(--teal-dark)", padding:"12px 24px", borderRadius:"8px", fontSize:"14px", fontWeight:800, textDecoration:"none", whiteSpace:"nowrap" }}>
              Build Resume Free →
            </a>
          </div>
        </div>
      </div>
      <Footer onCalc={() => {}} onHome={onBack} />
    </div>
  );
}
