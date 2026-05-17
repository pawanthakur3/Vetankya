import { useState, useEffect } from "react";

export default function Navbar({ onHome, onCalc, onCheck, transparent }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const solid = !transparent || scrolled;

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      height:"var(--nav-h)",
      background: solid ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: solid ? "blur(12px)" : "none",
      borderBottom: solid ? "1px solid var(--border)" : "none",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 5%", transition:"all 0.25s",
    }}>
      {/* Logo */}
      <button onClick={onHome} style={{ background:"none", border:"none", display:"flex", alignItems:"baseline", gap:"1px", cursor:"pointer" }}>
        <span style={{ fontFamily:"var(--fraunces)", fontSize:"1.35rem", fontWeight:700, color:"var(--ink)", fontStyle:"italic" }}>Vetan</span>
        <span style={{ fontFamily:"var(--jakarta)", fontSize:"1.35rem", fontWeight:800, color:"var(--teal)", letterSpacing:"-0.02em" }}>Kya</span>
        <span style={{ fontSize:"11px", color:"var(--ink3)", marginLeft:"5px", fontWeight:400 }}>.in</span>
      </button>

      {/* Nav links + CTA */}
      <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
        {onCheck && (
          <button onClick={onCheck} style={{ background:"none", border:"1.5px solid var(--border)", padding:"8px 16px", borderRadius:"8px", fontSize:"13px", fontWeight:600, color:"var(--ink2)", cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--teal)"; e.currentTarget.style.color="var(--teal)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--ink2)"; }}
          >
            Am I Underpaid?
          </button>
        )}
        {onCalc && (
          <button onClick={onCalc} style={{ background:"none", border:"1.5px solid var(--border)", padding:"8px 16px", borderRadius:"8px", fontSize:"13px", fontWeight:600, color:"var(--ink2)", cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--teal)"; e.currentTarget.style.color="var(--teal)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--ink2)"; }}
          >
            In-Hand Calculator
          </button>
        )}
        <button onClick={onHome} style={{ background:"var(--teal)", color:"white", border:"none", padding:"9px 20px", borderRadius:"8px", fontSize:"13px", fontWeight:700, cursor:"pointer", transition:"background 0.15s", whiteSpace:"nowrap" }}
          onMouseEnter={e => e.currentTarget.style.background="var(--teal-dark)"}
          onMouseLeave={e => e.currentTarget.style.background="var(--teal)"}
        >
          Check Salaries
        </button>
      </div>
    </nav>
  );
}
