import React from "react";

const ButtonList = () => {
  const list = [
    "All",
    "Stonks",
    "Crypto",
    "Tech",
    "Music",
    "Live",
    "Gaming",
    "Coding",
    "AI",
    "Startups",
    "Finance",
    "Space",
  ];

  return (
    <div className="flex w-full overflow-x-auto pb-4 scrollbar-hide space-x-3">
      {list.map((value, index) => (
        <button
          key={index}
          className="px-5 py-2 whitespace-nowrap bg-stonks-800 text-stonks-text rounded-lg border border-stonks-700 hover:bg-gradient-to-r hover:from-stonks-accent hover:to-stonks-purple hover:text-black hover:border-transparent transition-all duration-300 font-medium text-sm shadow-md hover:shadow-stonks-accent/20"
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default ButtonList;
