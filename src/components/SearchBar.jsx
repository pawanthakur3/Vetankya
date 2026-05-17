import { useState } from "react";
import { ROLES, CITIES, EXPERIENCES } from "../data/salaryData";

export default function SearchBar({ onSearch, large }) {
  const [role, setRole] = useState("");
  const [city, setCity] = useState("All India");
  const [exp,  setExp]  = useState("");

  const handle = () => {
    if (!role) return;
    onSearch({ role, city, exp });
  };

  const pad = large ? "14px 16px" : "10px 13px";
  const fs  = large ? "15px" : "14px";

  return (
    <div style={{
      background:"white", borderRadius: large ? "16px" : "12px",
      padding: large ? "20px" : "14px",
      boxShadow: large ? "var(--shadow-xl)" : "var(--shadow-md)",
      border:"1px solid var(--border)",
    }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr auto", gap:"10px", alignItems:"end" }}>
        <div>
          <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"6px" }}>Role / Job Title</label>
          <select value={role} onChange={e => setRole(e.target.value)} style={{ padding:pad, fontSize:fs }}>
            <option value="">Select role...</option>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"6px" }}>City</label>
          <select value={city} onChange={e => setCity(e.target.value)} style={{ padding:pad, fontSize:fs }}>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"6px" }}>Experience</label>
          <select value={exp} onChange={e => setExp(e.target.value)} style={{ padding:pad, fontSize:fs }}>
            <option value="">Any experience</option>
            {EXPERIENCES.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <button onClick={handle} style={{
          background:"var(--teal)", color:"white", border:"none",
          padding: large ? "14px 28px" : "10px 20px",
          borderRadius:"8px", fontSize: large ? "15px" : "14px", fontWeight:700,
          whiteSpace:"nowrap", transition:"background 0.15s",
          display:"flex", alignItems:"center", gap:"6px",
        }}
          onMouseEnter={e => e.currentTarget.style.background="var(--teal-dark)"}
          onMouseLeave={e => e.currentTarget.style.background="var(--teal)"}
        >
          {large ? "Check Salary →" : "Search"}
        </button>
      </div>
    </div>
  );
}
