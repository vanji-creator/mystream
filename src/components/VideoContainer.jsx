import React, { useEffect } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard, { AdVideoCard } from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSearchResults } from "../utils/videoSlice";

const VideoContainer = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((store) => store.video);
  console.log(searchResults);
  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const result = await data.json();
    dispatch(addSearchResults(result.items));
  };

  return (
    <div className="m-3 flex flex-wrap">
      {/* {videos[0] && <AdVideoCard info={videos[0]} />} */}
      {Array.isArray(searchResults) &&
        searchResults.map((video) => (
          <Link
            key={video.id}
            to={"/watch?v=" + (video.id.videoId ? video.id.videoId : video.id)}
          >
            <VideoCard info={video} />
          </Link>
        ))}
    </div>
  );
};

export default VideoContainer;
