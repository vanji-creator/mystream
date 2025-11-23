import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const TickerItem = ({ name, price, change, isUp }) => (
    <div className="flex items-center space-x-2 px-6 border-r border-stonks-700/50 min-w-max">
        <span className="font-bold text-stonks-text">{name}</span>
        <span className="text-gray-400 text-sm">${price}</span>
        <span className={`text-xs font-bold flex items-center ${isUp ? "text-stonks-accent" : "text-red-500"}`}>
            <FontAwesomeIcon icon={isUp ? faArrowUp : faArrowDown} className="mr-1" />
            {change}%
        </span>
    </div>
);

const Ticker = () => {
    const creators = [
        { name: "MrBeast", price: "420.69", change: "5.2", isUp: true },
        { name: "PewDiePie", price: "69.42", change: "1.2", isUp: false },
        { name: "MKBHD", price: "1080.00", change: "3.4", isUp: true },
        { name: "Linus", price: "3090.00", change: "0.5", isUp: false },
        { name: "Veritasium", price: "314.15", change: "2.1", isUp: true },
        { name: "Markiplier", price: "88.88", change: "4.0", isUp: true },
        { name: "Ludwig", price: "50.50", change: "1.8", isUp: false },
        { name: "Valkyrae", price: "100.00", change: "6.9", isUp: true },
    ];

    return (
        <div className="w-full bg-stonks-900 border-b border-stonks-700 overflow-hidden py-2 relative z-40">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...creators, ...creators].map((creator, index) => (
                    <TickerItem key={index} {...creator} />
                ))}
            </div>
        </div>
    );
};

export default Ticker;
