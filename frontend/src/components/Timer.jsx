import React, { useContext, useEffect, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./Buttons/PlayButton";
import PauseButton from "./Buttons/PauseButton";
import SettingsButton from "./Buttons/SettingsButton";
import { useSelector, useDispatch } from "react-redux";
import { toggleSettings } from "../features/pomodoro/pomodoroSlice";
import { CircleCheck } from "lucide-react";

const Timer = () => {
  const dispatch = useDispatch();
  const { showSettings, workDuration, breakDuration } = useSelector(
    (state) => state.pomo
  );

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(0);
  const [notificationMsg, setNotificationMsg] = useState("");

  const timeLeftRef = useRef(timeLeft);
  const modeRef = useRef(mode);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    initiateTimer();

    const intervalId = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (timeLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [showSettings, workDuration, breakDuration]);

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

    setIsPaused(true);
    isPausedRef.current = true;

    const notificationSound = new Audio("/sounds/finish_sound.mp3");
    notificationSound.play();

    setNotificationMsg(toggleMode === "work" ? "Its time to focus !!" : "Its break time 🎉");

    setTimeout(() => setNotificationMsg(""), 5000);
  };

  const tick = () => {
    timeLeftRef.current--;
    setTimeLeft(timeLeftRef.current);
  };

  const totalTime = mode === "work" ? workDuration * 60 : breakDuration * 60;
  const percentageLeft = Math.round((timeLeft / totalTime) * 100);

  const minutesLeft = Math.floor(timeLeft / 60);
  let secondsLeft = timeLeft % 60;
  if (secondsLeft < 10) secondsLeft = "0" + secondsLeft;

  return (
    <>
      <div className="flex items-center justify-center gap-2 fixed bottom-6 2xl:bottom-25 right-6 lg:right-20 text-green-800 xl:text-3xl">
        <CircleCheck className={`${notificationMsg.trim()===""?"hidden":"inline"} 2xl:size-10 2xl:pt-2 p-0.5`}/>
        <p>{notificationMsg}</p>
      </div>
      <div className="flex flex-col gap-3 sm:gap-5 lg:gap-3 2xl:gap-5 items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-xl sm:2xl 2xl:text-3xl text-green-800">
            {mode === "work" ? "Pomodoro" : "BreakTime"}
          </h1>
          <p className="xl:text-lg">
            {mode === "work"
              ? "Best time to be productive !!"
              : "ITs time to take a little break !!"}
          </p>
        </div>
        <CircularProgressbar
          className="size-24 sm:size-32 lg:size-30 2xl:size-52"
          value={percentageLeft}
          text={minutesLeft + ":" + secondsLeft}
          styles={buildStyles({
            textColor: mode === "work" ? "#016630" : "#397097",
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
            dispatch(toggleSettings(!showSettings));
          }}
        >
          <SettingsButton />
        </div>
      </div>
    </>
  );
};

export default Timer;
