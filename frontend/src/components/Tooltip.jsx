import React from "react";

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-0.5 rounded-md whitespace-nowrap z-12 shadow-md">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-800 rotate-45 -mt-1"></div>
      </div>
    </div>
  );
};

export default Tooltip;
