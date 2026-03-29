import { useState } from "react";
import Calendar from "react-calendar";
import PostPage from "./components/PostPage";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import GenreFilter from "./components/GenreFilter";
import GenreTag from "./components/GenreTag";
import Footer from "./components/Footer";
import Header from "./components/Header";

// 🔹 ジャンルアイコン＋色
const genreData = {
  "グルメ": { icon: "fa-utensils", color: "#FFA807" },
  "美容・健康": { icon: "fa-spa", color: "#FF6B6B" },
  "遊び・スポーツ": { icon: "fa-futbol", color: "#4ECDC4" },
  "学ぶ・スクール": { icon: "fa-book", color: "#556270" },
  "ショッピング": { icon: "fa-shopping-bag", color: "#C7F464" },
  "トラベル・アドベンチャー": { icon: "fa-hiking", color: "#FF6B81" },
  "アニメ・アイドル": { icon: "fa-microphone", color: "#FF69B4" }, // 追加
  "ものづくり・体験": { icon: "fa-cogs", color: "#6A82FB" }       // 追加
};

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
  const [imageUrl, setImageUrl] = useState(""); // 画像URL用
  const [memo, setMemo] = useState("");

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "ビーチヨガ",
      region: "磯の浦",
      organizer: "@yoga_ri",
      genres: ["美容・健康", "遊び・スポーツ"],
      date: "2026-04-04",
      image: "/images/aozora_yoga.jpeg",
      instagramLink: "https://www.instagram.com/flea_hanami/"
    },
    {
      id: 2,
      title: "子ども食堂",
      region: "九度山",
      organizer: "@kodomo_cafe",
      genres: ["グルメ", "遊び・スポーツ"],
      date: "2026-04-05",
      image: "/images/kodomo_syokudo.jpg"
    },
    {
      id: 3,
      title: "ビーチクリーン",
      region: "白浜",
      organizer: "@clean_kobe",
      genres: ["学ぶ・スクール", "トラベル・アドベンチャー"],
      date: "2026-04-18",
      image: "/images/beach_clean.avif"
    },
    {
      id: 4,
      title: "フリーマーケット",
      region: "高野山",
      organizer: "@flea_kyoto",
      genres: ["ショッピング"],
      date: "2026-04-11",
      image: ""
    },
    {
      id: 5,
      title: "桜ライトアップ",
      region: "紀三井寺",
      organizer: "@flea_hanami",
      genres: ["トラベル・アドベンチャー"],
      date: "2026-04-11",
      image: "/images/yozakura_5.jpeg"
    },
    {
      id: 6,
      title: "山登り初心者体験",
      region: "高野山",
      organizer: "@mountain_club",
      genres: ["遊び・スポーツ", "学ぶ・スクール"],
      date: "2026-03-28",
      image: ""
    },
    {
      id: 7,
      title: "桜スイーツフェア",
      region: "和歌山市",
      organizer: "@sakura_sweets",
      genres: ["グルメ", "ショッピング"],
      date: "2026-03-30",
      image: "/images/sakura_sweets.webp"
    },
    {
      id: 8,
      title: "こどもアート教室",
      region: "橋本",
      organizer: "@art_kids",
      genres: ["学ぶ・スクール"],
      date: "2026-04-12",
      image: ""
    },
    {
      id: 9,
      title: "春の里山散策",
      region: "紀美野",
      organizer: "@nature_walk",
      genres: ["トラベル・アドベンチャー", "美容・健康"],
      date: "2026-04-20",
      image: "/images/sansai_haruyama.jpg"
    },
    {
      id: 10,
      title: "手作りマルシェ",
      region: "田辺",
      organizer: "@handmade_marche",
      genres: ["ショッピング", "遊び・スポーツ"],
      date: "2026-05-02",
      image: ""
    },
    {
      id: 11,
      title: "初夏のキャンプ体験",
      region: "白浜",
      organizer: "@camp_adventure",
      genres: ["トラベル・アドベンチャー", "遊び・スポーツ"],
      date: "2026-05-10",
      image: "/images/camp.jpeg"
    },
    {
      id: 12,
      title: "ビアガーデンナイトバル",
      region: "和歌山市",
      organizer: "@beer_night",
      genres: ["グルメ", "遊び・スポーツ"],
      date: "2026-06-05",
      image: ""
    },
    {
      id: 13,
      title: "海辺の音楽祭",
      region: "白浜",
      organizer: "@beach_music",
      genres: ["遊び・スポーツ", "トラベル・アドベンチャー"],
      date: "2026-06-20",
      image: "/images/sunset_music.jpeg"
    },
    {
      id: 14,
      title: "夏休み科学教室",
      region: "橋本",
      organizer: "@science_kids",
      genres: ["学ぶ・スクール"],
      date: "2026-07-05",
      image: ""
    },
    {
      id: 15,
      title: "プールサイドヨガ",
      region: "紀三井寺",
      organizer: "@pool_yoga",
      genres: ["美容・健康", "遊び・スポーツ"],
      date: "2026-07-15",
      image: ""
    },
    {
      id: 16,
      title: "サマーフェスティバル",
      region: "高野山",
      organizer: "@summer_fes",
      genres: ["遊び・スポーツ", "ショッピング"],
      date: "2026-08-01",
      image: ""
    },
    {
      id: 17,
      title: "流しそうめん体験",
      region: "紀美野",
      organizer: "@summer_food",
      genres: ["グルメ", "遊び・スポーツ"],
      date: "2026-08-10",
      image: "/images/nagasisoumen_.jpeg"
    },
    {
      id: 18,
      title: "星空観察会",
      region: "田辺",
      organizer: "@night_sky",
      genres: ["学ぶ・スクール", "トラベル・アドベンチャー"],
      date: "2026-08-15",
      image: "/images/hoshizora.avif"
    },
    {
      id: 19,
      title: "盆踊り大会",
      region: "和歌山市",
      organizer: "@bon_odori",
      genres: ["遊び・スポーツ", "トラベル・アドベンチャー"],
      date: "2026-08-20",
      image: ""
    },
    {
      id: 20,
      title: "夏の手作り市",
      region: "白浜",
      organizer: "@summer_marche",
      genres: ["ショッピング", "グルメ"],
      date: "2026-08-25",
      image: ""
    },
    {
      id: 21,
      title: "アニメキャラクター交流会",
      region: "和歌山市",
      organizer: "@anime_fanclub",
      genres: ["アニメ・アイドル"],
      date: "2026-05-18",
      image: "/images/anime_meeting.jpeg"
    },
    {
      id: 22,
      title: "地元たま駅長ミニライブ",
      region: "貴志川駅",
      organizer: "@idol_local",
      genres: ["アニメ・アイドル"],
      date: "2026-06-12",
      image: "/images/tama_ekichoo.png"
    },
    {
      id: 23,
      title: "アイドル握手＆ワークショップ",
      region: "和歌山市",
      organizer: "@idol_workshop",
      genres: ["アニメ・アイドル", "ものづくり・体験"],
      date: "2026-07-08",
      image: "/images/idol_workshop.jpeg"
    }
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

          {/* 画像表示 */}
          {selectedEvent.image && (
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              style={{ width: "100%", maxWidth: 400, margin: "10px 0", borderRadius: 8 }}
            />
          )}

          <p style={{ fontWeight: "bold" }}>
            <i className="fa-regular fa-calendar" style={{ marginRight: "5px" }}></i>
            {new Date(selectedEvent.date).toLocaleDateString()}
          </p>
          <p>
            <i className="fa-solid fa-location-dot" style={{ marginRight: "5px" }}></i>
            {selectedEvent.region}
          </p>
          <p>
            <i className="fa-solid fa-user" style={{ marginRight: "5px" }}></i>
            {selectedEvent.organizer}
          </p>

          <p>
            {selectedEvent.genres.map((g) => (
              <GenreTag key={g} genre={g} />
            ))}
          </p>

          {/* メモ表示 */}
          {selectedEvent.memo && (
            <div style={{ marginTop: "20px" }}>
              <h3>メモ</h3>
              <p>{selectedEvent.memo}</p>
            </div>
          )}

          {/* 参加リンク */}
          <div style={{ marginTop: "20px" }}>
            <p>
              参加希望の方は{" "}
              <a
                href={selectedEvent.instagramLink} // ←ここでリンクを表示
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>{" "}
              から連絡してください
            </p>
          </div>

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


          <GenreFilter
            genreList={genreList}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />

          {events
            .filter((ev) => selectedGenres.length === 0 || selectedGenres.some((g) => ev.genres.includes(g)))
            .map((ev) => (
              <div
                key={ev.id}
                className="card"
                onClick={() => {
                  setSelectedEvent(ev);
                  setPage("detail");
                }}
              >
                <h2>{ev.title}</h2>
                <p>
                  <i className="fa-regular fa-calendar" style={{ marginRight: "5px" }}></i>
                  {new Date(ev.date).toLocaleDateString()}
                </p>
                <p>
                  <i className="fa-solid fa-location-dot" style={{ marginRight: "5px" }}></i>
                  {ev.region}
                </p>
                <p>
                  <i className="fa-solid fa-user" style={{ marginRight: "5px" }}></i>
                  {ev.organizer}
                </p>
                {ev.genres.map((g) => (
                  <GenreTag key={g} genre={g} />
                ))}
              </div>
            ))}
          <button onClick={() => handlePageChange("home")}>戻る</button>
        </div>
        <Footer />
      </div >
    );
  }

  // 🟡投稿ページ部分
  if (page === "post") {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <PostPage events={events} setEvents={setEvents} setPage={setPage} />
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
          {calendarDate.getMonth() + 1}月のイベント予定
        </h1>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",        // 赤丸と文字の間隔
          marginBottom: "10px"
        }}>
          <span
            style={{
              display: "inline-block",
              width: 20,
              height: 20,
              backgroundColor: "#FF6B6B",
              borderRadius: "50%",
              flexShrink: 0
            }}
          ></span>
          <span style={{ lineHeight: "12px" }}>イベント予定あり</span>
        </div>

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