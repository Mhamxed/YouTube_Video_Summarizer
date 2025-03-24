import React, { useState } from 'react';
import { motion } from 'framer-motion'

const YouTubeInput = ({ handlePreview, setYoutubeLink, youtubeLink, preview, VideoPreview, isPreviewLoading }) => {
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    const link = e.target.value;
    setYoutubeLink(link);
    
    // Simple validation - just checking if it has youtube in the URL
    setIsValid(link === '' || link.includes('youtube.com'));
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    { !preview && <>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">YouTube Video Preview</h2>
        
        <div className="mb-6">
          <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-700 mb-1">
            Enter YouTube URL
          </label>
          
          <div className={`relative flex items-stretch w-full ${isFocused ? 'ring-1 ring-lime-500 rounded-lg' : ''}`}>
            <input
              type="text"
              id="youtube-url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeLink}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`flex-grow px-4 py-3 rounded-l-lg border ${
                isValid ? 'border-gray-300 focus:border-lime-500' : 'border-red-500'
              } focus:outline-none text-gray-700`}
            />
            
            {!isPreviewLoading && <button
              onClick={handlePreview}
              disabled={!youtubeLink || !isValid}
              className={`px-6 py-3 rounded-r-lg font-medium text-sm transition-colors duration-150 ${
                youtubeLink && isValid
                  ? 'bg-lime-600 hover:bg-lime-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Preview
            </button>}
            
            {isPreviewLoading && <button className="px-6 py-3 rounded-r-lg font-medium text-sm transition-colors duration-150 disabled:opacity-70 disabled:cursor-not-allowed bg-lime-600 hover:bg-lime-700 text-white">
                <div className="flex items-center gap-2">
                <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                />
                </div>                
                </button> }
        </div>
          
          {!isValid && (
            <p className="mt-2 text-sm text-red-600">
              Please enter a valid YouTube URL
            </p>
          )}
          
          <p className="mt-2 text-xs text-gray-500">
            Supported formats: youtube.com/watch?v=...
          </p>
        </div> 
        </> }        
        
        { !preview && <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="mt-2 font-medium">Video preview will appear here</p>
              <p className="mt-1 text-sm">Enter a YouTube URL and click Preview</p>
            </div>
            </div> }
       { preview && <div className='bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center'>    
            { preview && VideoPreview }
        </div>  }
      </div>
    </div>
  );
};

export default YouTubeInput;