import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/breakfast.css";

function Breakfast() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(1);
  const [options, setOptions] = useState([]);
  const [winner, setWinner] = useState("");
  const [yesterdayWinner, setYesterdayWinner] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [current, setCurrent] = useState("");

  const spinRef = useRef(null);

  async function loadYesterday() {
    try {
      const res = await fetch("http://192.168.0.38:5000/roulette/yesterday_choices")
      const data = await res.json();

      setOptions(data.options || []);
      setYesterdayWinner(data.lastWinner || "");
    } catch (err) {
      console.error(err);
    }
  }

  function updateOption(index, value) {
    const updated = [...options];
    updated[index] = value;

    setOptions(updated);
  }

  function addOption() {
    setOptions([...options, ""]);
  }

  function removeOption(index) {
    const updated = options.filter((_, i) => i !== index);

    setOptions(updated);
  }

  async function spin() {
    if (options.length === 0) return;

    setSpinning(true);
    setWinner("");
    setPhase(3);

    let i = 0;

    spinRef.current = setInterval(() => {
      setCurrent(options[i % options.length]);
      i++;
    }, 100);

    setTimeout(async () => {
      clearInterval(spinRef.current);

      try {
        const res = await fetch("http://192.168.0.38:5000/roulette/todays_winner", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ options }),
        });

        const data = await res.json();

        setWinner(data.winner);
        setCurrent(data.winner);
      } catch (err) {
        console.error(err);
        setWinner("Error 😢");
      } finally {
        setSpinning(false);
      }
    }, 3000);
  }

  // =========================
  // PHASE I
  // =========================

  if (phase === 1) {
    return (
      <div className="fullscreen">
        <button className="btn btn-back" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h1 className="title">🍳 REGGELI RULETT</h1>

        <button
          className="btn btn-start"
          onClick={async () => {
            await loadYesterday();
            setPhase(2);
          }}
        >
          START
        </button>
      </div>
    );
  }

  // =========================
  // PHASE II
  // =========================

  if (phase === 2) {
    return (
      <div className="page">
        <button className="btn btn-back" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h1>🍳 Reggeli Rulett</h1>

        {options.map((opt, i) => (
          <div className="option-row" key={i}>
            <input
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              className={`option-input ${
                opt === yesterdayWinner ? "yesterday" : ""
              }`}
            />

            <button className="btn btn-remove" onClick={() => removeOption(i)}>
              -
            </button>
          </div>
        ))}

        <button className="btn btn-add" onClick={addOption}>
          + Add
        </button>

        <br />
        <br />

        <button
          className="btn btn-spin"
          onClick={spin}
          disabled={options.length === 0}
        >
          🎰 PÖRGET
        </button>
      </div>
    );
  }

  // =========================
  // PHASE III
  // =========================

  if (phase === 3) {
    return (
      <div className="fullscreen">
        <button className="btn btn-back" onClick={() => navigate("/")}>
          ← Back
        </button>
        {spinning && (
          <>
            <h1 className="spinning">Pörög...</h1>
            <h2 className="current-option">{current}</h2>
          </>
        )}

        {!spinning && winner && <h1 className="winner">🥞 {winner}</h1>}
      </div>
    );
  }

  return null;
}

export default Breakfast;
