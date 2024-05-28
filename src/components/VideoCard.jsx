import React from "react";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  return (
    <div className="w-64 m-3">
      <img className="rounded-md" src={thumbnails.medium.url} alt="thumbnail" />
      <ul>
        <li className="text-wrap font-bold ">{title}</li>
        <div className="flex ">
          <li>{channelTitle}</li>
          <li className="ml-4">{statistics.viewCount} views</li>
        </div>
      </ul>
    </div>
  );
};

export const AdVideoCard = ({ info }) => {
  return (
    <div className="">
      <p className="text-black font-bold absolute bg-white">AD</p>
      <VideoCard info={info} />
    </div>
  );
};

export default VideoCard;
