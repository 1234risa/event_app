import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

// 🔹 ジャンルアイコン＋色
const genreData = {
  "グルメ": { icon: "fa-utensils", color: "#FFA807" },
  "美容・健康": { icon: "fa-spa", color: "#FEA7F2" },
  "学ぶ・スクール": { icon: "fa-book-open", color: "#E5D62C" },
  "ショッピング": { icon: "fa-bag-shopping", color: "#F44C4C" },
  "遊び・スポーツ": { icon: "fa-mountain", color: "#75C9F3" },
  "トラベル・アドベンチャー": { icon: "fa-plane-departure", color: "#67E467" },
  "アニメ・アイドル": { icon: "fa-microphone", color: "#C153ED" }
};

const GenreTag = ({ genre, selected = false, onClick }) => {
  const data = genreData[genre];
  return (
    <span
      className="genre-tag"
      onClick={onClick}
      style={{
        cursor: "pointer",
        backgroundColor: selected ? data.color + "33" : "#f5f5f5", // 選択中は薄カラー、未選択は薄グレー
        color: selected ? data.color : "#555", // 選択中は色付き
      }}
    >
      <i className={`fa-solid ${data.icon}`} style={{ marginRight: 4 }}></i>
      {genre}
    </span>
  );
};

const Header = () => (
  <header className="header">
    <img src="/event_logo2.png" alt="logo" className="header-logo" />
    <h1 className="header-title">地域イベントアプリ</h1>
  </header>
);

const Footer = () => (
  <footer style={{ padding: "10px", backgroundColor: "#F44C4C", color: "#fff", marginTop: 20 }}>
    <small>© 2026 My Event App</small>
  </footer>
);

function App() {
  const [page, setPage] = useState("home");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [genres, setGenres] = useState([]);
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [events, setEvents] = useState([
    { id: 1, title: "ビーチヨガ", region: "大阪", organizer: "@yoga_risa", genres: ["美容・健康", "遊び・スポーツ"], date: "2026-04-04", image: "/images/public/aozora_yoga.jpeg" },
    { id: 2, title: "子ども食堂", region: "奈良", organizer: "@kodomo_cafe", genres: ["グルメ", "遊び・スポーツ"], date: "2026-04-05" },
    { id: 3, title: "ビーチクリーン", region: "神戸", organizer: "@clean_kobe", genres: ["学ぶ・スクール", "トラベル・アドベンチャー"], date: "2026-04-18" },
    { id: 4, title: "フリーマーケット", region: "京都", organizer: "@flea_kyoto", genres: ["ショッピング"], date: "2026-04-11" },
  ]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const genreList = Object.keys(genreData);
  // 🔵 詳細ページ 
  if (page === "detail" && selectedEvent) {
    return (
      <div className="App">
        <Header />

        <div className="container">
          <h1>{selectedEvent.title}</h1>

          {selectedEvent.image && (
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              style={{ width: "100%", maxWidth: 400, marginBottom: 10, borderRadius: 8 }}
            />
          )}

          <p style={{ fontWeight: "bold" }}>
            📅 {new Date(selectedEvent.date).toLocaleDateString()}
          </p>
          <p>📍 {selectedEvent.region}</p>
          <p>👤 {selectedEvent.organizer}</p>

          <p>
            {selectedEvent.genres.map((g) => (
              <GenreTag key={g} genre={g} />
            ))}
          </p>

          <button onClick={() => setPage("view")}>戻る</button>
        </div>

        <Footer />
      </div>
    );
  }

  // 🟢 一覧ページ
  if (page === "view") {
    return (
      <div className="App">
        <Header />
        <div className="container">

          <div>
            <p>ジャンルで絞り込み</p>
            {genreList.map((g) => (
              <GenreTag
                key={g}
                genre={g}
                selected={selectedGenres.includes(g)}
                onClick={() => {
                  if (selectedGenres.includes(g)) {
                    setSelectedGenres(selectedGenres.filter((item) => item !== g));
                  } else {
                    setSelectedGenres([...selectedGenres, g]);
                  }
                }}
              />
            ))}
          </div>

          {events
            .filter((ev) => selectedGenres.length === 0 || selectedGenres.some((g) => ev.genres.includes(g)))
            .map((ev) => (
              <div key={ev.id} className="card" onClick={() => { setSelectedEvent(ev); setPage("detail"); }}>
                <h2>{ev.title}</h2>
                <p>📅 {new Date(ev.date).toLocaleDateString()}</p>
                <p>📍 {ev.region}</p>
                <small>{ev.organizer}</small>
                <p>
                  {ev.genres.map((g) => (
                    <GenreTag key={g} genre={g} />
                  ))}
                </p>
              </div>
            ))}

          <button onClick={() => handlePageChange("home")}>戻る</button>
        </div>
        <Footer />
      </div>
    );
  }

  // 🟡 投稿ページ
  if (page === "post") {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <h1>イベント投稿</h1>

          <input
            placeholder="イベント名"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="場所"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />

          <input
            placeholder="主催者（Instagramなど）"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
          />

          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />

          <div>
            <p>ジャンルを選択</p>
            {genreList.map((g) => (
              <GenreTag
                key={g}
                genre={g}
                selected={selectedGenres.includes(g)}
                onClick={() => {
                  if (selectedGenres.includes(g)) {
                    setSelectedGenres(selectedGenres.filter((item) => item !== g));
                  } else {
                    setSelectedGenres([...selectedGenres, g]);
                  }
                }}
              />
            ))}
          </div>

          <button onClick={() => {
            const newEvent = { id: events.length + 1, title, region, organizer, genres };
            setEvents([...events, newEvent]);
            setTitle(""); setRegion(""); setOrganizer(""); setGenres([]);
            setPage("view");
          }}>投稿する</button>

          <button onClick={() => handlePageChange("home")}>戻る</button>
        </div>
        <Footer />
      </div>
    );
  }


  // 🏠 ホーム
  return (
    <div className="App">
      <Header />

      <div className="container">
        <h1 className="page-title">
          {calendarDate.getMonth() + 1}月のイベント
        </h1>

        <div className="calendar-wrapper">
          <Calendar
            value={calendarDate}
            onChange={(d) => {
              // 日付選択
              setCalendarDate(d);

              const formatted = d.toISOString().split("T")[0];
              const foundEvent = events.find(ev => ev.date === formatted);
              if (!foundEvent) return;

              setSelectedEvent(foundEvent);
              setPage("detail");
            }}
            onActiveStartDateChange={({ activeStartDate }) => {
              // 月をめくったときにここが呼ばれる
              setCalendarDate(activeStartDate);
            }}
            tileClassName={({ date }) => {
              const formatted = date.toISOString().split("T")[0];
              return events.some((ev) => ev.date === formatted) ? "event-day" : null;
            }}
          />
        </div>

        <button onClick={() => setPage("view")}>イベントを見る</button>
        <button onClick={() => setPage("post")}>投稿する</button>
      </div>

      <Footer />
    </div>
  );
}

export default App;