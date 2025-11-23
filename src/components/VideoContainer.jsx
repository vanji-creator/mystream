import React, { useEffect } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSearchResults } from "../utils/videoSlice";

const VideoContainer = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((store) => store.video);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const result = await data.json();
    dispatch(addSearchResults(result.items));
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 py-6 animate-fade-in">
      {Array.isArray(searchResults) &&
        searchResults.map((video) => (
          <Link
            key={typeof video.id === 'object' ? video.id.videoId : video.id}
            to={"/watch?v=" + (typeof video.id === 'object' ? video.id.videoId : video.id)}
          >
            <VideoCard info={video} />
          </Link>
        ))}
    </div>
  );
};

export default VideoContainer;
