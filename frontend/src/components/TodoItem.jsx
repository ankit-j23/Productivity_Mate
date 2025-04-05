import { Delete, Edit, Square } from "lucide-react";
import React from "react";

const TodoItem = () => {
  return (
    <div className="flex flex-col w-full gap-0.5 shadow-lg">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div>
            <Square className="size-5" />
          </div>
          <p className="font-sans -mt-0.5">
            {"Do Your Assignment just in the time."}
          </p>
        </div>
        <div className="flex gap-2">
          <Edit className="size-5" />
          <Delete className="size-5" />
        </div>
      </div>
      <hr className="w-full bg-black" />
    </div>
  );
};

export default TodoItem;
