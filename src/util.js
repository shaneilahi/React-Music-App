export const playSong = (audioRef) => {
  const playPromise = audioRef.current.play();
  if (playPromise !== undefined) {
    playPromise.then((audio) => {
      audioRef.current.play();
    });
  }
};

export const pauseSong = (audioRef) => {
  const pausePromise = audioRef.current.pause();
  if (pausePromise !== undefined) {
    pausePromise.then((audio) => {
      audioRef.current.pause();
    });
  }
};
