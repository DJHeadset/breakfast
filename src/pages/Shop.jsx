import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/kidCard.css";

function Shop() {
  const { kid } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/dashboard")}>← Back</button>
      <div className="kid-card">
        <div className="kid-header">
          <h2 className="kid-name">BÓT {kid}nak</h2>
        </div>
        <button className="btn btn-wip" disabled title="Fejlesztés alatt">
          🚧 ÉPÜL-SZÉPÜL 🛠️
        </button>

        <div className="wip-text">
          Dolgozunk rajta… hogy még szebb legyen 😄
        </div>
      </div>
    </div>
  );
}

export default Shop;
