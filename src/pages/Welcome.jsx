import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="fullscreen">
      <h1 className="title">BLAHO</h1>

      <div className="menu-buttons">
        <button className="btn btn-start" onClick={() => navigate("/breakfast")}>
          Reggeli Rulett
        </button>

        <button className="btn btn-start" onClick={() => navigate("/lunch")}>
          Ebéd Rulett
        </button>

        <button className="btn btn-start" onClick={() => navigate("/dinner")}>
          Vacsora szavazás
        </button>

        <button className="btn btn-start" onClick={() => navigate("/dashboard")}>
          Gyerekek
        </button>
      </div>
    </div>
  );
}

export default Welcome;
