import React, { useContext, useState } from "react";
import Timer from "./Timer";
import SettingsPomodoroTimer from "./SettingsPomodoroTimer";
import { useSelector } from "react-redux";

const Pomodorotimer = () => {
  const { showSettings } = useSelector((state) => state.pomo);

  return (
    <div className="flex flex-col max-w-[345px] sm:max-w-[398px] lg:w-[380px] 2xl:min-w-3/12 lg:max-h-[380px]  2xl:max-h-[500px] max-h-[500px] shadow-lg lg:shadow-2xl px-16 sm:px-24 lg:px-22 py-6 sm:gap-2 lg:gap-3">
      <div className="flex flex-col items-center mt-2">
        {showSettings ? <SettingsPomodoroTimer /> : <Timer />}
      </div>
    </div>
  );
};

export default Pomodorotimer;
