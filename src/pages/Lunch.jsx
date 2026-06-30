import { useNavigate } from "react-router-dom";
import "../styles/breakfast.css";

function Lunch() {
  const navigate = useNavigate();

  return (
    <div className="fullscreen">
      <button className="btn btn-back" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1 className="title">EBÉD RULETT</h1>

      <button className="btn btn-wip" disabled title="Fejlesztés alatt">
        🚧 ÉPÜL-SZÉPÜL 🛠️
      </button>

      <div className="wip-text">
        Dolgozunk rajta… hogy még finomabb legyen 😄
      </div>
    </div>
  );
}

export default Lunch;
