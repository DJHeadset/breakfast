import { useNavigate } from "react-router-dom";
import "../styles/kidCard.css";

function DashBoard() {
  const navigate = useNavigate();

  const kids = [
    {
      name: "Zolika",
      avatar: "🧠",
      score: 120,
      mood: "Boldog",
      choresDone: 3,
      choresTotal: 10,
      streak: 4,
      energy: 72,
      warnings: 1,
    },
    {
      name: "Mano",
      avatar: "🧠",
      score: 65,
      mood: "OK",
      choresDone: 3,
      choresTotal: 6,
      streak: 2,
      energy: 55,
      warnings: 2,
    },
    {
      name: "Bogi",
      avatar: "🧠",
      score: 92,
      mood: "HISZTI",
      choresDone: 7,
      choresTotal: 7,
      streak: 2,
      energy: 88,
      warnings: 0,
    },
  ];

  return (
    <div>
        <button className="btn btn-back" onClick={() => navigate("/")}>
          ← Back
        </button>

      <div className="kids-container">
        {kids.map((kid, index) => {
          const percent = Math.round(
            (kid.choresDone / kid.choresTotal) * 100
          );

          return (
            <div className="kid-card" key={index}>
              <div className="card-glow"></div>

              <div className="kid-header">
                <div className="kid-avatar">{kid.avatar}</div>

                <div>
                  <h2 className="kid-name">{kid.name}</h2>
                  <p className="kid-status">{kid.mood}</p>
                </div>

                <div className="score-ring">
                  <span>{kid.score}</span>
                </div>
              </div>

              <div className="divider"></div>

              <div className="stats-grid">
                <div className="stat-box">
                  <span className="stat-label">CHORE RATE</span>
                  <span className="stat-value">{percent}%</span>
                </div>

                <div className="stat-box">
                  <span className="stat-label">STREAK</span>
                  <span className="stat-value">{kid.streak} DAYS</span>
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

              <div className="progress-section">
                <div className="progress-top">
                  <span>Daily Tasks</span>
                  <span>
                    {kid.choresDone}/{kid.choresTotal}
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
                <button className="action-btn">DETAILS</button>
                <button className="action-btn secondary">REWARD</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DashBoard;