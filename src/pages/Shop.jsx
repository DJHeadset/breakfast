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
      <button onClick={() => navigate("/dashboard")}>
        ← Back
      </button>

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
              <span className="shop-item-name">
                {item.item}
              </span>

              <span className="shop-item-points">
                ⭐ {item.points} pont
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
