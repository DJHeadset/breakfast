import { useNavigate } from "react-router-dom";
import welcome from "../resources/pic/Landing2.png";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="fullscreen"
      style={{
        backgroundImage: `url(${welcome})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="title">BLAHO</h1>

      <div className="menu-buttons">
        <button
          className="btn btn-start"
          //style={{ position: "absolute", top: "20px", left: "-156%" }}
          onClick={() => navigate("/breakfast")}
        >
          Reggeli Rulett
        </button>

        <button
          className="btn btn-start"
          //style={{ position: "absolute", top: "20px", left: "150%" }}
          onClick={() => navigate("/lunch")}
        >
          Ebéd Rulett
        </button>

        <button
          className="btn btn-start"
          //style={{ position: "absolute", top: "0%", left: "57%" }}
          onClick={() => navigate("/dinner")}
        >
          Vacsora szavazás
        </button>

        <button
          className="btn btn-start"
          //style={{ position: "absolute", top: "300%", left: "121%" }}
          onClick={() => navigate("/dashboard")}
        >
          Gyerekek
        </button>
      </div>
    </div>
  );
}

export default Welcome;
