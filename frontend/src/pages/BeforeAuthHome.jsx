import React from "react";
import illustration from "/assets/illustration.png";

const BeforeAuthHome = () => {
  return (
    <div>
      <div className=" flex lg:flex-row max-lg:flex-col  items-center justify-center lg:mt-14 sm:gap-12 xl:gap-20 max-lg:mt-10 max-lg:pb-20 xl:px-10">
        <div className="flex  overflow-auto w-[300px]  sm:w-[420px] sm:h-[420px] xl:w-[630px] xl:h-[630px]">
          <img src={illustration} alt="" />
        </div>
        <div className="max-w-[200px] sm:max-w-[300px] lg:max-w-[450px]">
          <h1 className="text-green-800 text-3xl sm:text-5xl xl:text-6xl font-semibold">Welcome to</h1>
          <h1 className="text-green-800 text-3xl sm:text-5xl xl:text-6xl font-semibold typewriter">Productivity Mate</h1>
          <p className="text-black/70 sm:text-xl xl:text-3xl w-[230px] sm:w-[300px] lg:w-[450px] sm:mt-5 xl:mt-8">Your daily companion for focued work, efficient task tracking, and long term growth.</p>
        </div>
      </div>
    </div>
  );
};

export default BeforeAuthHome;
