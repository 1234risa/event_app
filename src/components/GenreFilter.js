// src/components/GenreFilter.js
import GenreTag from "./GenreTag";

export default function GenreFilter({ genreList, selectedGenres, setSelectedGenres }) {
  return (
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
  );
}

