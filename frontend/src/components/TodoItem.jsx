import { Delete, Edit, Square } from "lucide-react";
import React from "react";

const TodoItem = () => {
  return (
    <div className="flex flex-col w-full gap-0.5 shadow-lg">
      <div className="flex justify-between ">
        <div className="flex gap-2">
          <div>
            <Square className=" size-4 2xl:size-5 text-green-800/80" />
          </div>
          <p className="font-sans -mt-0.5 lg:-mt-1.5 text-sm lg:text-md 2xl:text-lg ">
            {"Do Your Assignment of Java."}
          </p>
        </div>
        <div className="flex gap-1 lg:gap-2 max-lg:ml-1">
          <button><Edit className="size-4 2xl:size-5 text-green-800/80" /></button>
          <button><Delete className="size-4 2xl:size-5 text-green-800/80" /></button>
        </div>
      </div>
      <hr className="w-full text-black/60" />
    </div>
  );
};

export default TodoItem;
