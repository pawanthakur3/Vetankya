import { useState } from "react";
import "./styles/globals.css";
import LandingPage      from "./pages/LandingPage";
import ResultsPage      from "./pages/ResultsPage";
import CompanyPage      from "./pages/CompanyPage";
import CalculatorPage   from "./pages/CalculatorPage";
import SalaryCheckPage  from "./pages/SalaryCheckPage";

export default function App() {
  const [page,    setPage]    = useState("landing");
  const [search,  setSearch]  = useState({ role:"", city:"All India", exp:"" });
  const [company, setCompany] = useState("");

  const goResults  = (s) => { setSearch(s); setPage("results"); };
  const goCompany  = (c) => { setCompany(c); setPage("company"); };
  const goCalc     = ()  => setPage("calculator");
  const goCheck    = ()  => setPage("salarycheck");
  const goHome     = ()  => setPage("landing");

  if (page === "results")     return <ResultsPage    search={search}  onBack={goHome} onCompany={goCompany} onCalc={goCalc} />;
  if (page === "company")     return <CompanyPage    company={company} onBack={goHome} onSearch={goResults} />;
  if (page === "calculator")  return <CalculatorPage onBack={goHome}  onCheck={goCheck} />;
  if (page === "salarycheck") return <SalaryCheckPage onBack={goHome} onCalc={goCalc} />;
  return <LandingPage onSearch={goResults} onCompany={goCompany} onCalc={goCalc} onCheck={goCheck} />;
}
