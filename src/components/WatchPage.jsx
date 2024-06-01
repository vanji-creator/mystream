import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import Comments from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mx-28 my-5 rounded-lg flex h-[600px]">
        <div>
          <iframe
            className="rounded-lg"
            width="900"
            height="500"
            src={
              "https://www.youtube.com/embed/" +
              searchParams.get("v") +
              "?autoplay=1"
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p className="border border-black pt-2 h-[100px] rounded-lg text-center">
            Video Description
          </p>
        </div>
        <div className="">
          <LiveChat />
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default WatchPage;
