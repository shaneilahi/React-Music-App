const LibrarySong = ({
  song,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songs,
  setSongs,
}) => {
  const chooseSongHandler = () => {
    // console.log(song);
    setCurrentSong(song);

    // Disabled this so that it doesn't run twice cuzz useEffect has the same code and it will run when we update currentSong state
    // // Add Active State
    // const newSongs = songs.map((state) => {
    //   // Check if the current element matches with the current song via id
    //   // If matches then uppdate the active element
    //   if (state.id === song.id) {
    //     return { ...state, active: true };
    //   } else {
    //     // Else dont updpate the active element
    //     return { ...state, active: false };
    //   }
    // });
    // console.log("hi from songHnadler");

    // // Finally after making changes update it with the new songs data
    // setSongs(newSongs);

    // disabled this cuz the audio is getting pplpayed via useEFFect when currentSong changes
    // defination is defined inside PLayer.js compoonenet
    // Check if audio was playing
    // if (isPlaying) {
    //   // Check if audio is loaded or not
    //   const playPromise = audioRef.current.play();
    //   // if not loaded wait for it
    //   if (playPromise !== undefined) {
    //     playPromise.then((audio) => {
    //       // Once the audio is playable, play it
    //       audioRef.current.play();
    //     });
    //   }
    // }
  };
  return (
    <div
      onClick={chooseSongHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
