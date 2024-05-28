import React from "react";
import Button from "./Button";

const ButtonList = () => {
  const list = [
    "All",
    "Tutorials",
    "Music",
    "Recently Added",
    "Live",
    "Vlogs",
    "Football",
    "Cricket",
    "IPL",
    "Champions League",
  ];

  return (
    <div className="flex">
      {list.map((value, index) => (
        <Button key={index} name={value} />
      ))}
    </div>
  );
};

export default ButtonList;
