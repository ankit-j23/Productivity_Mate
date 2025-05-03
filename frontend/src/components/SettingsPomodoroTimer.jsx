import React, { useContext } from "react";
import ReactSlider from "react-slider";
import { useSelector, useDispatch } from "react-redux";
import {
  updateBreakDuration,
  toggleSettings,
  updateWorkDuraion,
} from "../features/pomodoro/pomodoroSlice";

const SettingsPomodoroTimer = () => {
  const dispatch = useDispatch();
  const { workDuration, breakDuration, showSettings } = useSelector(
    (state) => state.pomo
  );

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-16 lg:mt-9 2xl:mt-18">
      <div>
        <label className="text-black/60" htmlFor="">
          Work: {workDuration}:00
        </label>
        <ReactSlider
          className="slider flex items-center"
          thumbClassName="thumb"
          trackClassName="track"
          value={workDuration}
          onChange={(newSelectedValue) =>
            dispatch(updateWorkDuraion(newSelectedValue))
          }
          min={1}
          max={120}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-black/60" htmlFor="">
          Break: {breakDuration}:00
        </label>
        <ReactSlider
          className="slider flex items-center"
          thumbClassName="thumb"
          trackClassName="track"
          value={breakDuration}
          s
          onChange={(newSelectedValue) =>
            dispatch(updateBreakDuration(newSelectedValue))
          }
          min={1}
          max={120}
        />
      </div>
      <div
        className="shadow-xl p-2 border-2 rounded-lg border-green-800/60 cursor-pointer"
        onClick={() => {
          dispatch(toggleSettings(!showSettings));
        }}
      >
        <h1>Done</h1>
      </div>
    </div>
  );
};

export default SettingsPomodoroTimer;
