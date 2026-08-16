import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOldJson } from "../services/jsonService";
import "../styles/shop.css";
import { normalizeKids } from "../services/dataNormaliser";

function Shop() {
  const { kid } = useParams();
  const navigate = useNavigate();

  const [shop, setShop] = useState([]);
  const [kidData, setKidData] = useState(null);
  const [flashingItem, setFlashingItem] = useState(null);

  function glows(req, act) {
    return act >= req
      ? {
          boxShadow: "0 0 20px gold",
        }
      : {};
  }

  function flashRed(index) {
    setFlashingItem(index);

    setTimeout(() => {
      setFlashingItem(null);
    }, 500);
  }

  async function handleClick(item, index) {
    const newGold = kidData.gold - item.points;
    if (newGold < 0) {
      flashRed(index);
      return;
    }
    setKidData((prev) => ({
      ...prev,
      gold: newGold,
    }));
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/misc/buy_shop`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kid: kid,
            item: item.item,
          }),
        },
      );
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      const [shopData, kidsData] = await Promise.all([
        getOldJson("/misc/get_shop"),
        getOldJson("/chores/get_chores"),
      ]);

      setShop(shopData.shop);

      const kids = normalizeKids(kidsData);
      setKidData(kids[kid]);
    };

    loadData();
  }, [kid]);

  return (
    <div>
      <button onClick={() => navigate("/dashboard")}>← Back</button>
      <div className="kid-card">
        <div className="kid-header">
          <h2 className="kid-name">BÓT {kid}nak</h2>
          {kidData && (
            <div className="score-ring">
              <span>{kidData.gold}</span>
            </div>
          )}
        </div>
        <div className="shop-list">
          {shop.map((item, index) => (
            <div className="shop-item" key={index}>
              <span className="shop-item-name">{item.item}</span>
              <button
                className={`shop-item-points ${
                  flashingItem === index ? "shop-item-flash" : ""
                }`}
                style={
                  flashingItem === index ? {} : glows(item.points, kidData.gold)
                }
                onClick={() => handleClick(item, index)}
              >
                ⭐ {item.points} gold
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
