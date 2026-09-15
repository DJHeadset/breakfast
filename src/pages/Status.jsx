import { useNavigate } from "react-router-dom";
import "../styles/status.css";
import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function Status() {
  const navigate = useNavigate();

  const [house, setHouse] = useState(null);

  function StatusRow({ name, healthClass }) {
    return (
      <div className="status-row">
        <span className={`status-light ${healthClass}`} />

        <span className="status-name">{name}</span>
      </div>
    );
  }

  function AtticuusStatus({ status, hdd, backup }) {
    const [expanded, setExpanded] = useState(false);

    /* ================= STORAGE CALCULATIONS ================= */

    const hasHddData = hdd && hdd.total != null && hdd.available != null;

    const total = hasHddData ? Number(hdd.total) : 0;
    const available = hasHddData ? Number(hdd.available) : 0;

    const used = total - available;

    const usedPercent = hasHddData && total > 0 ? (used / total) * 100 : null;

    /* ================= HEALTH STATUS ================= */

    let health = "ONLINE";
    let healthClass = "online";

    // Atticuus itself is offline
    if (status !== "ONLINE") {
      health = "CRITICAL";
      healthClass = "critical";
    }

    // Atticuus is online, but HDD information is unavailable
    else if (!hasHddData) {
      health = "WARNING";
      healthClass = "warning";
    }

    // HDD is available and getting full
    else if (usedPercent >= 80) {
      health = "WARNING";
      healthClass = "warning";
    }

    /* ================= FORMAT SIZE ================= */

    const formatSize = (kb) => {
      const gb = kb / 1024 / 1024;

      if (gb >= 1024) {
        return `${(gb / 1024).toFixed(2)} TB`;
      }

      return `${gb.toFixed(1)} GB`;
    };

    /* ================= STORAGE COLOR ================= */

    let storageClass = "storage-good";

    if (usedPercent >= 90) {
      storageClass = "storage-critical";
    } else if (usedPercent >= 80) {
      storageClass = "storage-warning";
    }

    return (
      <div className={`atticuus-card`}>
        {/* ================= MAIN BAR ================= */}

        <button
          className="atticuus-main"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="status-result">
            <span className={`status-light ${healthClass}`} />

            <strong>{health}</strong>
          </div>

          <div className="atticuus-title">
            <span>⚔️ Atticuus</span>
          </div>
        </button>

        {/* ================= EXPANDABLE DETAILS ================= */}

        {expanded && (
          <div className="atticuus-details">
            {/* ONLINE STATUS */}

            <div className="atticuus-detail-row">
              <span>📡 Network</span>

              <span className="detail-status">
                <span
                  className={`status-light ${
                    status === "ONLINE" ? "online" : "critical"
                  }`}
                />

                {status}
              </span>
            </div>

            {/* HDD STORAGE */}

            <div className="atticuus-storage">
              {hasHddData ? (
                <>
                  <div className="hdd-header">
                    <span>💾 Storage</span>

                    <strong>{usedPercent.toFixed(1)}% used</strong>
                  </div>

                  <div className="storage-bar">
                    <div
                      className={`storage-used ${storageClass}`}
                      style={{
                        width: `${Math.min(usedPercent, 100)}%`,
                      }}
                    />
                  </div>

                  <div className="storage-info">
                    <span>Used: {formatSize(used)}</span>

                    <span>Free: {formatSize(available)}</span>

                    <span>Total: {formatSize(total)}</span>
                  </div>
                </>
              ) : (
                <div className="hdd-header">
                  <span>💾 Storage</span>

                  <strong>N/A</strong>
                </div>
              )}
            </div>

            {/* BACKUP */}

            <div className="atticuus-detail-row">
              <span>💾 Backups</span>

              <span className="detail-status">
                <span
                  className={`status-light ${
                    backup?.status === "OK" ? "online" : "critical"
                  }`}
                />

                {backup?.status || "UNKNOWN"}
              </span>
            </div>
            <div className="backup-info">
              <div>
                📅 Backup date:
                <strong>{house.backup?.date || "Unknown"}</strong>
              </div>

              <div>
                🕒 Last backup:
                <strong>{house.backup?.lastBackup || "Unknown"}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function BackupStatus({ house }) {
    const [expanded, setExpanded] = useState(false);
    const backup = house.backup;
    //console.log(backup);

    const today = new Date().toLocaleDateString("en-CA");
    // Gives YYYY-MM-DD in most environments

    const hasData =
      backup &&
      backup.status &&
      backup.compose &&
      backup.homeassistant &&
      backup.lastBackup &&
      backup.date;

    /* ================= HEALTH ================= */

    let healthClass = "online";

    // Missing required information = RED
    if (!hasData) {
      healthClass = "critical";
    }

    // Backup itself explicitly failed = RED
    else if (backup.status !== "OK") {
      healthClass = "critical";
    }

    // Compose or HA failed = YELLOW
    else if (backup.compose !== "OK" || backup.homeassistant !== "OK") {
      healthClass = "warning";
    }

    // Backup is not from today = YELLOW
    else if (backup.date !== today) {
      healthClass = "warning";
    }

    return (
      <div className="backup-card">
        {/* ================= MAIN BAR ================= */}

        <button className="backup-main" onClick={() => setExpanded(!expanded)}>
          <div className="status-result">
            <span className={`status-light ${healthClass}`} />
          </div>

          <div className="atticuus-title">
            <span>💾 Backups</span>
          </div>
        </button>

        {/* ================= DETAILS ================= */}

        {expanded && (
          <div className="backup-details">
            {/* COMPOSE */}

            <StatusRow
              name="🐳 Docker Compose"
              healthClass={
                backup?.compose === "OK"
                  ? "online"
                  : backup?.compose
                    ? "warning"
                    : "critical"
              }
            />

            {/* HOME ASSISTANT */}

            <StatusRow
              name="🏠 Home Assistant"
              healthClass={
                backup?.homeassistant === "OK"
                  ? "online"
                  : backup?.homeassistant
                    ? "warning"
                    : "critical"
              }
            />

            {/* LAST BACKUP */}

            <div className="backup-detail-row">
              <span
                className={`status-light ${
                  !backup?.lastBackup
                    ? "critical"
                    : backup?.date !== today
                      ? "warning"
                      : "online"
                }`}
              />

              <div className="backup-detail-text">
                <span>🕒 Last Backup</span>

                <strong>{backup?.lastBackup || "MISSING"}</strong>
              </div>
            </div>

            {/* BACKUP DATE */}

            <div className="backup-detail-row">
              <span
                className={`status-light ${
                  !backup?.date
                    ? "critical"
                    : backup.date !== today
                      ? "warning"
                      : "online"
                }`}
              />

              <div className="backup-detail-text">
                <span>📅 Backup Date</span>

                <strong>{backup?.date || "MISSING"}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/misc/get_status`);
        const data = await res.json();
        console.log(data.data);
        setHouse(data.data);
      } catch (error) {
        console.error("Failed to load house status:", error);
      }
    };

    getStatus();

    const interval = setInterval(getStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!house) {
    return (
      <div className="fullscreen">
        <button className="btn btn-back" onClick={() => navigate("/")}>
          ← Back
        </button>

        <h1 className="title">🏠 HOUSE STATUS</h1>

        <div className="wip-text">Loading Mari Néni's reports...</div>
      </div>
    );
  }

  return (
    <div className="fullscreen status-page">
      <button className="btn btn-back" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1 className="title">🏠 HOUSE STATUS</h1>

      <section className="status-section">
        {/* ==================== NETWORK & MACHINES ==================== */}

        <h2>🌐 NETWORK & MACHINES</h2>

        <StatusRow
          name="Internet"
          healthClass={
            house?.internet === "ONLINE"
              ? "online"
              : house?.internet
                ? "warning"
                : "critical"
          }
        />

        <AtticuusStatus
          status={house.atticuus}
          hdd={house.atticuus_hdd}
          backup={house.backup}
        />

        <BackupStatus house={house} />
      </section>

      {/* ==================== PERSON OF THE DAY ==================== */}

      <section className="person-section">
        <h2>👑 PERSON OF THE DAY 👑</h2>

        <div className="person-of-the-day">
          <div className="crown">👑</div>

          <div className="today-person">{house.today}</div>

          <div className="person-description">Today's Person of the Day!</div>
        </div>

        <div className="person-stats">
          <div className="person-stat">
            <span className="stat-label">👨 Apa</span>

            <strong className="stat-number">{house.dadLast}</strong>
          </div>

          <div className="person-stat">
            <span className="stat-label">👩 Anya</span>

            <strong className="stat-number">{house.momLast}</strong>
          </div>

          <div className="person-stat">
            <span className="stat-label">➡️ Holnap</span>

            <strong className="tomorrow-person">{house.tomorrow}</strong>
          </div>
        </div>
      </section>

      {/* ==================== LAST UPDATE ==================== */}

      <div className="last-updated">
        🕒 Last updated:
        <strong>
          {" "}
          {house._meta?.lastUpdated
            ? new Date(house._meta.lastUpdated).toLocaleString("hu-HU")
            : "Unknown"}
        </strong>
      </div>
    </div>
  );
}

export default Status;
