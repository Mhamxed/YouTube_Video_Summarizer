function VideoPreview({ title, channelName, thumbnailUrl, views, timestamp, duration, handleGenerate}) {

  return (
    <div className="inset-0 flex justify-center items-center">
    <div className= "flex flex-col gap-2 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 md:w-[30rem]">
      {/* Thumbnail with duration overlay */}
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
          <img
            src={thumbnailUrl} 
            alt={`Thumbnail for ${title}`}
            className="md:w-[30rem] object-cover"
          />
        </div>
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
          {duration}
        </div>
      </div>
      
      {/* Video information */}
      <div className="p-4">
        {/* Title - truncated after 2 lines */}
        <h3 className="font-medium text-gray-900 text-base mb-1 line-clamp-2">
          {title}
        </h3>
        
        {/* Channel name and metadata */}
        <div className="flex flex-col mt-1">
          <span className="text-gray-600 text-sm">
            {channelName}
          </span>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <span>{views} views</span>
            <span className="mx-1">•</span>
            <span>{timestamp}</span>
          </div>
        </div>
        
        {/* Action buttons */}
        { handleGenerate && <div className="flex justify-center mt-3 pt-3 border-t border-gray-100">
            <button className="flex justify-center items-center px-4 py-2 rounded-md border border-transparent text-sm font-medium text-white bg-lime-600 hover:bg-lime-700" onClick={() => handleGenerate()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Generate Summary
          </button>
        </div> }
      </div>
    </div>
    </div>
  );
};

export default VideoPreview;