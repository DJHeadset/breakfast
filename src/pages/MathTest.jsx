
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/mathTest.css";

function generateProblems() {
  return Array.from({ length: 5 }, () => {
    const A = Math.floor(Math.random() * 19) + 1;
    const B = Math.floor(Math.random() * (20 - A)) + 1;
    return { A, B };
  });
}

function MathTest() {
  const navigate = useNavigate();

  const [problems, setProblems] = useState(generateProblems);
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [results, setResults] = useState([null, null, null, null, null]);
  const [showNewGame, setShowNewGame] = useState(false);

  const victory = results.every((result) => result === true);

  useEffect(() => {
    if (!victory) return;

    setShowNewGame(false);

    const timer = setTimeout(() => {
      setShowNewGame(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, [victory]);

  function handleChange(index, value) {
    setAnswers((prev) =>
      prev.map((answer, i) => (i === index ? value : answer))
    );

    setResults((prev) =>
      prev.map((result, i) => (i === index ? null : result))
    );
  }

  function handleKeyDown(e, index) {
    if (e.key !== "Enter") return;

    const { A, B } = problems[index];
    const correct =
      answers[index].trim() !== "" &&
      Number(answers[index]) === A + B;

    setResults((prev) =>
      prev.map((result, i) => (i === index ? correct : result))
    );
  }

  function newGame() {
    setProblems(generateProblems());
    setAnswers(["", "", "", "", ""]);
    setResults([null, null, null, null, null]);
    setShowNewGame(false);
  }

  return (
    <div className="math-game">
      <button className="math-back" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1 className="math-title">MATEK GYAKORLÁS</h1>

      <div className="math-problems">
        {problems.map(({ A, B }, index) => (
          <div className="math-row" key={index}>
            <span className="math-equation">
              {A} + {B} =
            </span>

            <input
              className={`math-input ${
                results[index] === true
                  ? "correct"
                  : results[index] === false
                  ? "incorrect"
                  : ""
              }`}
              type="number"
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`Answer to ${A} plus ${B}`}
            />
          </div>
        ))}
      </div>

      {victory && (
        <div className="victory-overlay">
          <div className="fireworks" aria-hidden="true">
            {[15, 50, 85].map((x, burstIndex) => (
              <div
                className="firework"
                key={x}
                style={{
                  "--x": `${x}%`,
                  "--y": `${burstIndex === 1 ? 35 : 48}%`,
                  "--delay": `${burstIndex * 0.35}s`,
                }}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <span
                    key={i}
                    style={{ "--angle": `${i * 30}deg` }}
                  />
                ))}
              </div>
            ))}
          </div>

          <h2 className="victory-title">🎉 VICTORY! 🎉</h2>

          {showNewGame && (
            <button className="new-game-button" onClick={newGame}>
              NEW GAME
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MathTest;