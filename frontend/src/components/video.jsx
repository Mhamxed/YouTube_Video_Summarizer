import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Thumbnail with duration overlay */}
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
          <img 
            src={video.thumbnailUrl} 
            alt={`Thumbnail for ${video.title}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
          {video.duration}
        </div>
        
        {/* Summarized badge */}
        <div className="absolute top-2 left-2 bg-lime-600 text-white text-xs px-2 py-1 rounded-md font-medium">
          Summarized
        </div>
      </div>
      
      {/* Video information */}
      <div className="p-4">
        {/* Title - truncated after 2 lines */}
        <h3 className="font-medium text-gray-900 text-base mb-1 line-clamp-2 h-12">
          {video.title}
        </h3>
        
        {/* Channel name and metadata */}
        <div className="flex flex-col mt-1">
          <span className="text-gray-600 text-sm">
            {video.channelName}
          </span>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <span>{video.views} views</span>
            <span className="mx-1">•</span>
            <span>{video.timestamp}</span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
          <Link to={`/videos/${video.id}`}>
            <button className="text-lime-600 hover:text-lime-800 text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Summary
            </button>
          </Link>
          <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            More
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;