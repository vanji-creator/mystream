import React from "react";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="p-2 m-2 w-72 transform hover:scale-105 transition-all duration-300 cursor-pointer group">
      <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-stonks-accent/30 border border-transparent group-hover:border-stonks-accent/50">
        <img
          className="rounded-xl w-full object-cover aspect-video group-hover:brightness-110 transition-all duration-300"
          src={thumbnails.medium.url}
          alt="thumbnail"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
          <span className="text-xs font-bold bg-stonks-accent text-black px-2 py-1 rounded">Watch Now</span>
        </div>
      </div>
      <div className="mt-3 px-1">
        <h3 className="font-bold text-stonks-text text-base line-clamp-2 leading-tight group-hover:text-stonks-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mt-1 hover:text-white transition-colors">
          {channelTitle}
        </p>
        {statistics && statistics.viewCount && (
          <p className="text-gray-500 text-xs mt-1">
            {Number(statistics.viewCount).toLocaleString()} views
          </p>
        )}
      </div>
    </div>
  );
};

export const AdVideoCard = ({ info }) => {
  return (
    <div className="p-1 m-1 border border-stonks-purple rounded-xl bg-stonks-800/50">
      <VideoCard info={info} />
      <div className="absolute top-4 left-4 bg-stonks-purple text-white text-xs font-bold px-2 py-0.5 rounded shadow-lg">
        Ad
      </div>
    </div>
  );
};

export default VideoCard;
