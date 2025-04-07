import React, { useContext, useEffect, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./Buttons/PlayButton";
import PauseButton from "./Buttons/PauseButton";
import SettingsButton from "./Buttons/SettingsButton";
import PomoContext from "../Contexts/PomodoroContext/PomoContext";

const Timer = () => {
  const context = useContext(PomoContext);
  const { showSettings, setShowSettings, workDuration, breakDuration } =
    context;
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(0);

  const timeLeftRef = useRef(timeLeft);
  const modeRef = useRef(mode);
  const isPausedRef = useRef(isPaused);

  const initiateTimer = () => {
    timeLeftRef.current = workDuration * 60;
    setTimeLeft(timeLeftRef.current);
  };

  const switchMode = () => {
    const toggleMode = modeRef.current === "work" ? "break" : "work";
    const nextTimeLeft =
      (toggleMode === "work" ? workDuration : breakDuration) * 60;

    setMode(toggleMode);
    modeRef.current = toggleMode;

    setTimeLeft(nextTimeLeft);
    timeLeftRef.current = nextTimeLeft;

    setIsPaused(true)
    isPausedRef.current = true
  };

  const tick = () => {
    timeLeftRef.current--;
    setTimeLeft(timeLeftRef.current);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (timeLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    initiateTimer();

    return () => clearInterval(intervalId);
  }, [context]);

  const totalTime = mode === "work" ? workDuration * 60 : breakDuration * 60;
  const percentageLeft = (100- (Math.round((timeLeft / totalTime) * 100)));

  const minutesLeft = Math.floor(timeLeft / 60);
  let secondsLeft = timeLeft % 60;
  if (secondsLeft < 10) secondsLeft = "0" + secondsLeft;

  return (
    <div className="flex flex-col gap-3 sm:gap-5 lg:gap-3 2xl:gap-5 items-center justify-center">
      <CircularProgressbar
        className="size-24 sm:size-32 lg:size-30 2xl:size-52"
        value={percentageLeft}
        text={minutesLeft + ":" + secondsLeft}
        styles={buildStyles({
          textColor: "#016630",
          pathColor: mode === "work" ? "#016630" : "#397097",
        })}
      />
      <div>
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div
        className="shadow-xl p-2 border-2 border-green-800/60 rounded-lg"
        onClick={() => {
          setShowSettings(!showSettings);
        }}
      >
        <SettingsButton />
      </div>
    </div>
  );
};

export default Timer;
