import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="fullscreen">
      <h1 className="title">BLAHO</h1>

      <button
        className="btn btn-start"
        onClick={() => navigate("/breakfast")}
      >
        🍳Reggeli Rulett
      </button>
    </div>
  );
}

export default Welcome;