// src/components/GenreTag.js
const genreData = {
  "グルメ": { icon: "fa-utensils", color: "#FFA807" },
  "美容・健康": { icon: "fa-spa", color: "#FF6B6B" },
  "遊び・スポーツ": { icon: "fa-futbol", color: "#4ECDC4" },
  "学ぶ・スクール": { icon: "fa-book", color: "#556270" },
  "ショッピング": { icon: "fa-shopping-bag", color: "#C7F464" },
  "トラベル・アドベンチャー": { icon: "fa-hiking", color: "#FF6B81" },
  "アニメ・アイドル": { icon: "fa-microphone", color: "#FF69B4" },
  "ものづくり・体験": { icon: "fa-cogs", color: "#6A82FB" }
};

export default function GenreTag({ genre, selected = false, onClick }) {
  const data = genreData[genre];
  return (
    <span
      className="genre-tag"
      onClick={onClick}
      style={{
        cursor: "pointer",
        backgroundColor: selected ? data.color + "33" : data.color + "11",
        color: selected ? data.color : "#555",
        padding: "3px 8px",
        borderRadius: 5,
        marginRight: 4,
        display: "inline-flex",
        alignItems: "center",
        fontSize: "0.9rem",
      }}
    >
      <i className={`fa-solid ${data.icon}`} style={{ marginRight: 4 }}></i>
      {genre}
    </span>
  );
}