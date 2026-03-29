import { useState } from "react";

export default function PostPage({ events, setEvents, setPage }) {
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [region, setRegion] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [memo, setMemo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreList = ["グルメ", "美容", "スポーツ", "音楽"]; // 必要なジャンル

  const handleSubmit = () => {
    if (!title || !region || !organizer || !eventDate) {
      alert("タイトル・場所・主催者・日付は必須です");
      return;
    }

    const newEvent = {
      id: events.length + 1,
      title,
      date: new Date(eventDate).toISOString().split("T")[0],
      region,
      organizer,
      genres: selectedGenres,
      memo,
      image: imageUrl || null,
      instagramLink: "https://www.instagram.com/〇〇/"
    };

    setEvents([...events, newEvent]);

    // 入力リセット
    setTitle("");
    setRegion("");
    setOrganizer("");
    setEventDate(new Date());
    setSelectedGenres([]);
    setImageUrl("");
    setMemo("");

    setPage("view");
  };

  return (
    <div className="container">
      <h1>イベント投稿</h1>

      <input
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        value={eventDate.toISOString().split("T")[0]}
        onChange={(e) => setEventDate(new Date(e.target.value))}
      />

      <input
        placeholder="地域"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />

      <input
        placeholder="主催者 (Instagramなど)"
        value={organizer}
        onChange={(e) => setOrganizer(e.target.value)}
      />

      <textarea
        placeholder="メモ (参加希望時はInstagramから連絡くださいなど)"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        rows={4}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <input
        placeholder="画像URL（任意）"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button onClick={handleSubmit}>投稿する</button>

    </div>
  );
}