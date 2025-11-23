import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

const HypeButton = () => {
    const [isHyped, setIsHyped] = useState(false);
    const [count, setCount] = useState(420);

    const handleHype = () => {
        setIsHyped(true);
        setCount(count + 1);
        setTimeout(() => setIsHyped(false), 1000);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={handleHype}
                className={`
          relative overflow-hidden px-8 py-3 rounded-full font-bold text-black transition-all duration-300 transform
          ${isHyped ? "scale-110 bg-stonks-purple shadow-[0_0_30px_rgba(189,0,255,0.7)]" : "bg-gradient-to-r from-stonks-accent to-stonks-purple hover:shadow-[0_0_20px_rgba(0,255,157,0.5)]"}
        `}
            >
                <span className="relative z-10 flex items-center gap-2">
                    <FontAwesomeIcon icon={faRocket} className={`transition-transform duration-500 ${isHyped ? "translate-x-1 -translate-y-1" : ""}`} />
                    HYPE {count}
                </span>
                {isHyped && (
                    <>
                        <div className="absolute inset-0 bg-white opacity-20 animate-ping rounded-full"></div>
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce">
                            🚀
                        </div>
                    </>
                )}
            </button>
        </div>
    );
};

export default HypeButton;
