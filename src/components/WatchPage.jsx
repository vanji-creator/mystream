import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import Comments from "./CommentsContainer";
import LiveChat from "./LiveChat";
import HypeButton from "./HypeButton";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  return (
    <div className="flex flex-col w-full p-6 animate-fade-in max-w-screen-2xl mx-auto">
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-stonks-700 group ring-1 ring-white/10">
            <iframe
              className="w-full h-full"
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
          </div>
          <div className="mt-6 p-6 glass rounded-2xl border border-stonks-700 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-stonks-text mb-3">Video Description</h1>
              <p className="text-gray-400 leading-relaxed">
                Experience the best content on StonksStream. Like, share, and subscribe for more premium vibes.
              </p>
            </div>
            <div className="ml-4">
              <HypeButton />
            </div>
          </div>
          <div className="mt-8">
            <Comments />
          </div>
        </div>
        <div className="w-full xl:w-[400px] flex-shrink-0">
          <LiveChat />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
