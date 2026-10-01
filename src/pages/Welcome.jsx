import { useNavigate } from "react-router-dom";
import welcome from "../resources/pic/Landing.png";
import springVillage from "../resources/pic/village/SpringVillage.png";
import summerVillage from "../resources/pic/village/SummerVillage.png";
import fallVillage from "../resources/pic/village/FallVillage.png";
import winterVillage from "../resources/pic/village/WinterVillage.png";
import clear from "../resources/pic/sky/Clear.png";
import partClear from "../resources/pic/sky/PartClear.png";
import partCloud from "../resources/pic/sky/PartCloud.png";
import fullCloud from "../resources/pic/sky/FullCloud.png";
import Rain from "../components/Rain";
import Snow from "../components/Snow";
import { useEffect, useState } from "react";

function Welcome() {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);

  const month = new Date().getMonth();
  let village;

  function getSky(cloudCover) {
    if (cloudCover < 20) {
      return clear;
    } else if (cloudCover < 45) {
      return partClear;
    } else if (cloudCover < 75) {
      return partCloud;
    }
    return fullCloud;
  }

  function getWeatherEffect(code) {
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
      return "rain";
    } else if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
      return "snow";
    } else if (code >= 95 && code <= 99) {
      return "storm";
    }
    return null;
  }

  if (month >= 2 && month <= 4) {
    village = springVillage;
  } else if (month >= 5 && month <= 7) {
    village = summerVillage;
  } else if (month >= 8 && month <= 10) {
    village = fallVillage;
  } else {
    village = winterVillage;
  }

  const sky = weather ? getSky(weather.cloud_cover) : clear;

  const effect = weather ? getWeatherEffect(weather.weather_code) : null;

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast" +
            "?latitude=47.64" +
            "&longitude=20.19" +
            "&current=temperature_2m,relative_humidity_2m,weather_code,cloud_cover,wind_speed_10m,is_day" +
            "&timezone=Europe%2FBudapest",
        );

        if (!response.ok) {
          throw new Error(`Weather request failed: ${response.status}`);
        }

        const data = await response.json();

        setWeather(data.current);
        console.log("Weather:", data.current);
      } catch (error) {
        console.error("Could not get weather:", error);
      }
    };

    getWeather();

    const interval = setInterval(getWeather, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fullscreen"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${sky})`,
          backgroundSize: "auto",
          backgroundPosition: "top left",
          backgroundRepeat: "no-repeat",
          transform: "scale(0.9)",
          transformOrigin: "top left",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${village})`,
          backgroundSize: "auto",
          backgroundPosition: "top left",
          backgroundRepeat: "no-repeat",
          transform: "scale(0.7)",
          transformOrigin: "top left",
          zIndex: 1,
        }}
      />

      {effect === "rain" && <Rain />}
      {effect === "snow" && <Snow />}

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${welcome})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 3,
        }}
      />
      <div style={{ position: "relative", zIndex: 4 }}>
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
            onClick={() => navigate("/status")}
          >
            STATUS
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
    </div>
  );
}

export default Welcome;
