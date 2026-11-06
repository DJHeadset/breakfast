import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import "../styles/status.css";
import "../styles/watchlist.css";

const API_URL = process.env.REACT_APP_API_URL;

function YoutubeWatchList() {
  const navigate = useNavigate();

  const [watchList, setWatchlist] = useState(null);

  useEffect(() => {
    const getWatchlist = async () => {
      try {
        const res = await fetch(`${API_URL}/misc/get_watchlist`);
        if (!res.ok) {
          throw new Error(`youtube watchlist request failed: ${res.status}`);
        }
        const result = await res.json();
        console.log(result);
        setWatchlist(result);
      } catch (error) {
        console.error("Failed to load youtube watchlist:", error);
      }
    };
    getWatchlist();
  }, []);

  if (!watchList) {
    return (
      <div className="fullscreen">
        <button className="btn btn-back" onClick={() => navigate("/")}>
          ← Back
        </button>

        <h1 className="title">Watchlist</h1>

        <div className="wip-text">Loading Mari Néni's reports...</div>
      </div>
    );
  }

  return (
    <div className="fullscreen status-page">
      <button className="btn btn-back" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1 className="title">Watchlist</h1>

      <div className="backup-details">
        <ul className="creator-list">
          {watchList.map((creator) => (
            <li key={creator.handle} className="creator-section">
              <div className="creator-header">
                <img
                  src={creator.thumbnail}
                  alt={creator.name}
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
                <strong>{creator.name}</strong>
              </div>

              <ul className="video-list">
                {creator.videos.map((video) => (
                  <li key={video.link} className="video-item">
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={video.watched !== false ? "watched" : ""}
                    >
                      {video.title}
                    </a>

                    <button className="btn btn-watched">WATCHED</button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default YoutubeWatchList;
