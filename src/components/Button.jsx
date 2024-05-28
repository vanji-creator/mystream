import React from "react";

const Button = ({ name }) => {
  return (
    <div>
      <button className="mx-2 px-2 py-1 bg-gray-300 rounded-md hover:bg-black hover:text-white">
        {name}
      </button>
    </div>
  );
};

export default Button;
