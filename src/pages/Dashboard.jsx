import { useNavigate } from "react-router-dom";
import "../styles/kidCard.css";
import { useEffect, useState } from "react";
import { getOldJson } from "../services/jsonService";
import { normalizeKids } from "../services/dataNormaliser";

function DashBoard() {
  const navigate = useNavigate();

  const [isFlipped, setIsFlipped] = useState(false);
  const initialKids = {
    Zolika: {
      avatar: "🧠",
      score: 120,
      mood: "Boldog",
      choresDone: 5,
      choresTotal: 10,
      streak: 4,
      energy: 72,
      warnings: 1,
      activeTitle: "Szárítólovag",

      skills: [
        {
          skill: "Mosogatás",
          xp: 6,
          stars: 1,
          title: "Mosogatóinas",
        },
        {
          skill: "Törölgetés",
          xp: 2,
          stars: 0,
          title: "",
        },
        {
          skill: "Söprés",
          xp: 8,
          stars: 1,
          title: "Seprűforgató",
        },
        {
          skill: "Pakolás",
          xp: 10,
          stars: 2,
          title: "Rendszerező",
        },
        {
          skill: "Felmosás",
          xp: 1,
          stars: 0,
          title: "",
        },
        {
          skill: "Teregetés",
          xp: 5,
          stars: 1,
          title: "Szárítólovag",
        },
        {
          skill: "Hajtogatás",
          xp: 0,
          stars: 0,
          title: "",
        },
      ],
    },
    Mano: {
      avatar: "🧠",
      score: 65,
      mood: "OK",
      choresDone: 3,
      choresTotal: 6,
      streak: 2,
      energy: 55,
      warnings: 2,
      activeTitle: "Rendszerező",

      skills: [
        {
          skill: "mosogatas",
          xp: 3,
          stars: 0,
          title: "",
        },
        {
          skill: "torolgetes",
          xp: 1,
          stars: 0,
          title: "",
        },
        {
          skill: "sopres",
          xp: 2,
          stars: 0,
          title: "",
        },
        {
          skill: "pakolas",
          xp: 10,
          stars: 2,
          title: "Rendszerező",
        },
        {
          skill: "felmosas",
          xp: 0,
          stars: 0,
          title: "",
        },
        {
          skill: "teregetes",
          xp: 2,
          stars: 0,
          title: "",
        },
        {
          skill: "hajtogatas",
          xp: 1,
          stars: 0,
          title: "",
        },
      ],
    },
    Bogi: {
      avatar: "🧠",
      score: 92,
      mood: "HISZTI",
      choresDone: 7,
      choresTotal: 7,
      streak: 2,
      energy: 88,
      warnings: 0,
      activeTitle: "Törlőőr",

      skills: [
        {
          skill: "mosogatas",
          xp: 12,
          stars: 2,
          title: "Tányérlovag",
        },
        {
          skill: "torolgetes",
          xp: 7,
          stars: 1,
          title: "Törlőőr",
        },
        {
          skill: "sopres",
          xp: 4,
          stars: 0,
          title: "",
        },
        {
          skill: "pakolas",
          xp: 6,
          stars: 1,
          title: "Rendrakó",
        },
        {
          skill: "felmosas",
          xp: 3,
          stars: 0,
          title: "",
        },
        {
          skill: "teregetes",
          xp: 9,
          stars: 1,
          title: "Szárítólovag",
        },
        {
          skill: "hajtogatas",
          xp: 2,
          stars: 0,
          title: "",
        },
      ],
    },
  };

  const [kids, setKids] = useState({});

  const handleClick = (kidName, title) => {
    setKids((prev) => ({
      ...prev,
      [kidName]: {
        ...prev[kidName],
        activeTitle: title,
      },
    }));
  };

  const renderFront = (kidName, kid) => {
    const percent = Math.round((kid.actualScore / kid.availableScore) * 100);

    return (
      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-label">CHORE RATE</span>
          <span className="stat-value">{percent}%</span>
        </div>

        <div className="stat-box">
          <span className="stat-label">STREAK</span>
          <span className="stat-value">{kid.score} DAYS</span>
        </div>

        <div className="stat-box">
          <span className="stat-label">ENERGY</span>
          <span className="stat-value">{kid.energy}%</span>
        </div>

        <div className="stat-box warning">
          <span className="stat-label">WARNINGS</span>
          <span className="stat-value">{kid.warnings}</span>
        </div>
      </div>
    );
  };

  const renderBack = (kidName, kid) => {
    return (
      <div className="kid-card-inner">
        <div className="card-face card-back">
          <h3>Skill Progression</h3>

          <div className="skills-container">
            {kid.skills
              .filter((skill) => skill.xp > 0)
              .map((skill) => (
                //console.log(skill.name);
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
      const data = await getOldJson();
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
          //console.log(percent);

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
                  <span>Daily Tasks</span>
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
                  DETAILS
                </button>
                <button
                  className="action-btn secondary"
                  onClick={() => navigate(`/shop/${kidName}`)}
                >
                  REWARD
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
