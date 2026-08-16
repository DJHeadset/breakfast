import { useNavigate } from "react-router-dom";
import "../styles/kidCard.css";
import { useEffect, useState } from "react";
import { getOldJson } from "../services/jsonService";
import { normalizeKids } from "../services/dataNormaliser";

function DashBoard() {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [isFlipped, setIsFlipped] = useState(false);
  const [kids, setKids] = useState({});

  const handleClick = async (kidName, title) => {
    setKids((prev) => ({
      ...prev,
      [kidName]: {
        ...prev[kidName],
        activeTitle: title,
      },
    }));

    try {
      await fetch(`${API_URL}/misc/change_tittle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kid: kidName,
          title: title,
        }),
      });
    } catch (err) {
      console.error("Failed to save title:", err);
    }
  };

  const renderFront = (kidName, kid) => {
    const percent = Math.round((kid.actualScore / kid.availableScore) * 100);

    return (
      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-label">FELADAT</span>
          <span className="stat-value">{percent}%</span>
        </div>

        <div className="stat-box">
          <span className="stat-label">JÓ GYEREKEK</span>
          <span className="stat-value">{kid.score} NAPJA</span>
        </div>

        <div className="stat-box">
          <span className="stat-label">ENERGY</span>
          <span className="stat-value">{kid.energy}%</span>
        </div>

        <div
          className={`stat-box warning ${
            kid.warnings >= 3 ? "warning-nuclear" : ""
          }`}
          style={{
            "--warning-level": Math.min(kid.warnings, 3),
          }}
        >
          <span className="stat-label">BÜNTETÉS</span>
          <span className="stat-value">{kid.warnings}</span>
        </div>
      </div>
    );
  };

  const renderBack = (kidName, kid) => {
    return (
      <div className="kid-card-inner">
        <div className="card-face card-back">
          <h3>Skill</h3>

          <div className="skills-container">
            {kid.skills
              .filter((skill) => skill.xp > 0)
              .map((skill) => (
                <div key={skill.name} className="skill-row">
                  {/* HEADER */}
                  <div className="skill-header">
                    <div>{skill.name}</div>
                    <div>{skill.xp} XP</div>
                  </div>

                  {/* STARS + TITLE (SAME LINE) */}
                  <div className="skill-level-line">
                    <div className="stars">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className={`star ${skill.stars > i ? "filled" : ""}`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>

                    {skill.title && (
                      <div
                        className="skill-title"
                        onClick={() => handleClick(kidName, skill.title)}
                      >
                        {skill.title}
                      </div>
                    )}
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="progress-bar small">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${(skill.xp % 5) * 20}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const loadKids = async () => {
      const data = await getOldJson("/chores/get_chores");
      setKids(normalizeKids(data));
    };
    loadKids();
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/")}>← Back</button>

      <div className="kids-container">
        {Object.entries(kids).map(([kidName, kid]) => {
          const percent = Math.round(
            (kid.actualScore / kid.availableScore) * 100,
          );

          return (
            <div className="kid-card" key={kidName}>
              <div className="card-glow"></div>

              <div className="kid-header">
                <div className="kid-avatar">{kid.avatar}</div>

                <div>
                  <h2 className="kid-name">{kidName}</h2>
                  <p className="kid-status">{kid.activeTitle}</p>
                </div>

                <div className="score-ring">
                  <span>{kid.gold}</span>
                </div>
              </div>

              <div className="divider"></div>

              <div>
                {isFlipped
                  ? renderBack(kidName, kid)
                  : renderFront(kidName, kid)}
              </div>

              <div className="divider"></div>

              <div className="progress-section">
                <div className="progress-top">
                  <span>Napi Feladatok</span>
                  <span>
                    {kid.actualScore}/{kid.availableScore}
                  </span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <div className="card-footer">
                <button
                  className="action-btn"
                  onClick={() => {
                    setIsFlipped(!isFlipped);
                  }}
                >
                  RÉSZLETEK
                </button>
                <button
                  className={`action-btn secondary ${
                    kid.warnings >= 3 ? "shop-locked" : ""
                  }`}
                  onClick={() => {
                    if (kid.warnings < 3) {
                      navigate(`/shop/${kidName}`);
                    }
                  }}
                >
                  <span className="shop-button-text">BOLT</span>

                  {kid.warnings >= 3 && <span className="shop-lock">✕</span>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DashBoard;
