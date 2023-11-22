import React from "react";
import LibrarySong from "../components/LibrarySong.js";

function Library({
  songs,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongs,
  libraryStatus,
}) {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            key={song.id}
            audioRef={audioRef}
            songs={songs}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
