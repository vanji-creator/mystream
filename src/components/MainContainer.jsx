import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import Ticker from "./Ticker";

const MainContainer = () => {
  return (
    <div className="flex flex-col flex-1 min-w-0">
      <Ticker />
      <div className="mt-4 mx-8">
        <ButtonList />
        <VideoContainer />
      </div>
    </div>
  );
};

export default MainContainer;
