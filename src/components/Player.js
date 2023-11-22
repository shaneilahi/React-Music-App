import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome//free-solid-svg-icons";
import { playSong, pauseSong } from "../util";

const Player = ({
  currentSong,
  setCurrentSong,
  songs,
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongs,
}) => {
  React.useEffect(() => {
    // Add Active State
    const newSongs = songs.map((state) => {
      // Check if the current element matches with the current song via id
      // If matches then uppdate the active element
      if (state.id === currentSong.id) {
        return { ...state, active: true };
      } else {
        // Else dont updpate the active element
        return { ...state, active: false };
      }
    });

    // Finally after making changes update it with the new songs data
    setSongs(newSongs);

    // play song if it wwas playing earlier
    if (isPlaying) {
      playSong(audioRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  // const audioRef = React.useRef(null);
  // const audioCounter = React.useRef(0);
  // const playSong = () => {
  //   const playPromise = audioRef.current.play();
  //   if (playPromise !== undefined) {
  //     playPromise.then((audio) => {
  //       audioRef.current.play();
  //     });
  //   }
  // };
  // const pauseSong = () => {
  //   const pausePromise = audioRef.current.pause();
  //   if (pausePromise !== undefined) {
  //     pausePromise.then((audio) => {
  //       audioRef.current.pause();
  //     });
  //   }
  // };

  const playSongHandler = () => {
    console.log(audioRef);
    if (isPlaying) {
      pauseSong(audioRef);
      setIsPlaying(!isPlaying);
    } else {
      playSong(audioRef);
      setIsPlaying(!isPlaying);
    }
  };

  // const skipSongHandler = async () => {
  //   if (audioCounter.current + 1 < songs.length) {
  //     await setCurrentSong(songs[++audioCounter.current]);
  //     if (isPlaying) {
  //       audioRef.current.play();
  //     }
  //   } else {
  //     console.log("cant go above current song");
  //   }
  // };
  // const skipBackSongHandler = async () => {
  //   if (audioCounter.current - 1 >= 0) {
  //     await setCurrentSong(songs[--audioCounter.current]);
  //     if (isPlaying) {
  //       audioRef.current.play();
  //     }
  //   } else {
  //     console.log("cant go below current song");
  //   }
  // };

  const skipTrackHandler = (direction) => {
    const currentIndex = songs.findIndex((song) => {
      return song.id === currentSong.id;
    });

    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if (currentIndex - 1 >= 0) {
        setCurrentSong(songs[currentIndex - 1]);
      } else {
        setCurrentSong(songs[songs.length - 1]);
      }
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    // Calculate How much we have listent the song
    const roundedCurrent = Math.round(current); // removes fractions
    const roundedDuration = Math.round(duration); // removes fractions
    // const roundedPercentage = Math.round(
    //   (roundedCurrent / roundedDuration) * 100
    // ); // i dont like this result cuz its getting rounded and so its not perfect

    // const percentage = (current / duration) * 100; // Most acurated result
    const percentage = (roundedCurrent / roundedDuration) * 100; // but this one suits it more

    // console.log(percentage);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: percentage,
    });
  };

  const getTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  };

  const dragHandler = (e) => {
    // console.log(e.target.value);
    const draggedDuration = e.target.value;
    const draggedPercentage = (draggedDuration / songInfo.duration) * 100;

    setSongInfo({
      ...songInfo,
      currentTime: draggedDuration,
      animationPercentage: draggedPercentage,
    });

    audioRef.current.currentTime = draggedDuration; // updates the current time which results in calling timeUpdateHandler
  };

  // State
  const [songInfo, setSongInfo] = React.useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const animatingSliderStyles = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
    // background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]}`,
  };

  const songEndedHandler = async () => {
    // Find the current Song Index
    const currentIndex = songs.findIndex((song) => {
      return song.id === currentSong.id;
    });

    // Uppdate the CurrentSong State with the next song
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

    // if (isPlaying) playSong(audioRef); // DOnt need this cuz useEffect will pplay audio after updating currentSonng
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]}`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div className="animate-track" style={animatingSliderStyles}></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => {
            skipTrackHandler("skip-back");
          }}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => {
            skipTrackHandler("skip-forward");
          }}
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndedHandler}
      ></audio>
    </div>
  );
};

export default Player;
