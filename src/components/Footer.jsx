export default function Footer({ onCalc, onHome }) {
  return (
    <footer style={{ background:"#0A1520", padding:"40px 5% 24px" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:"40px", marginBottom:"32px" }}>
          <div>
            <div style={{ display:"flex", alignItems:"baseline", gap:"1px", marginBottom:"12px" }}>
              <span style={{ fontFamily:"var(--fraunces)", fontSize:"1.3rem", fontWeight:700, color:"white", fontStyle:"italic" }}>Vetan</span>
              <span style={{ fontFamily:"var(--jakarta)", fontSize:"1.3rem", fontWeight:800, color:"var(--teal)" }}>Kya</span>
            </div>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.45)", lineHeight:1.7, maxWidth:"280px" }}>
              India's most transparent salary comparison platform. Real data from real professionals across every city and role.
            </p>
          </div>
          <div>
            <div style={{ fontSize:"11px", fontWeight:700, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"12px" }}>Tools</div>
            {["Check My Salary","In-Hand Calculator","Company Salaries","Salary Trends"].map((l,i) => (
              <button key={i} onClick={i===1?onCalc:onHome} style={{ display:"block", background:"none", border:"none", color:"rgba(255,255,255,0.55)", fontSize:"13px", padding:"4px 0", cursor:"pointer", textAlign:"left" }}
                onMouseEnter={e => e.target.style.color="var(--teal)"}
                onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.55)"}
              >{l}</button>
            ))}
          </div>
          <div>
            <div style={{ fontSize:"11px", fontWeight:700, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"12px" }}>Top Roles</div>
            {["Software Engineer","Data Scientist","Product Manager","DevOps Engineer","MBA Fresher"].map((l,i) => (
              <div key={i} style={{ color:"rgba(255,255,255,0.55)", fontSize:"13px", padding:"4px 0" }}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:"20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"8px" }}>
          <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.3)" }}>© 2026 VetanKya.in · Salary data is crowdsourced and for reference only</span>
          <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.3)" }}>Made with ❤️ in India · Also try BanaoResume.in</span>
        </div>
      </div>
    </footer>
  );
}
