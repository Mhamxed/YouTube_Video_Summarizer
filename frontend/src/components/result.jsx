import React, { useState, useEffect, useRef } from 'react';
import Loading from './loading';
import Feedback from './feedback';

const ResultsDisplay = ({ summary, keyInsights, YouTubeInput, showResults, setshowResults, showKeyinsights, setShowKeyinsights }) => {
    const [completedParagraphs, setCompletedParagraphs] = useState([]);
    const [currentParagraph, setCurrentParagraph] = useState('');
    const [paragraphIndex, setParagraphIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const [completedKeyInsights, setCompletedKeyInsights] = useState([]);
    const [currentKeyInsight, setCurrentKeyInsight] = useState('');
    const [keyInsightIndex, setKeyInsightIndex] = useState(0);
    const [charIndexTwo, setCharIndexTwo] = useState(0);


    // handle copy
    const [copied, setCopied] = useState(false);
    const resultsRef = useRef(null);

    // Function to handle copying results
    const handleCopyResults = () => {
        // Create a string from all completed insights and the current one
        const textToCopy = [
            "Summary",
            ...summary,
            "KeyInsights",
            ...keyInsights
        ].join('\n\n');
    
    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
        // Show success message
        setCopied(true);
        
        // Reset the "Copied" message after 2 seconds
        setTimeout(() => {
            setCopied(false);
        }, 2000);
        })
        .catch(err => {
        console.error('Failed to copy text: ', err);
        });
    };


  // Typewriter effect for paragraphs
  useEffect(() => {
    if (!showResults || paragraphIndex >= summary.length) {
        if (completedParagraphs.length >= summary.length) {
            setShowKeyinsights(true)
            return
        }
        return
    };
    
    const currentFullParagraph = summary[paragraphIndex];
    
    if (charIndex < currentFullParagraph.length) {
      // Still typing the current paragraph
      const typingSpeed = 
        currentFullParagraph[charIndex] === '.' ? 150 : 
        currentFullParagraph[charIndex] === ',' ? 100 : 5;
      
      const timer = setTimeout(() => {
        setCurrentParagraph(prev => prev + currentFullParagraph[charIndex]);
        setCharIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    } else {
      // Finished typing the current paragraph
      const timer = setTimeout(() => {
        // Add the completed paragraph to our array
        setCompletedParagraphs(prev => [...prev, currentParagraph]);
        // Reset for the next paragraph
        setCurrentParagraph('');
        setCharIndex(0);
        setParagraphIndex(prev => prev + 1);
      }, 500); // Pause between paragraphs
      
      return () => clearTimeout(timer);
    }
  }, [showResults, paragraphIndex, charIndex, summary]);


    // Typewriter effect for keyinsights
    useEffect(() => {
        if (!showKeyinsights || keyInsightIndex >= keyInsights.length) {
            if (keyInsightIndex >= keyInsights.length) {
                setshowResults(false)
                setShowKeyinsights(false)
                return
            }
            return
        };
        
        const currentFullKeyInsight = keyInsights[keyInsightIndex];
        
        if (charIndexTwo < currentFullKeyInsight.length) {
          // Still typing the current paragraph
          const typingSpeed = 
          currentFullKeyInsight[charIndexTwo] === '.' ? 150 : 
          currentFullKeyInsight[charIndexTwo] === ',' ? 100 : 25;
          
          const timer = setTimeout(() => {
            setCurrentKeyInsight(prev => prev + currentFullKeyInsight[charIndexTwo]);
            setCharIndexTwo(prev => prev + 1);
          }, typingSpeed);
          
          return () => clearTimeout(timer);
        } else {
          // Finished typing the current paragraph
          const timer = setTimeout(() => {
            // Add the completed paragraph to our array
            setCompletedKeyInsights(prev => [...prev, currentKeyInsight]);
            // Reset for the next paragraph
            setCurrentKeyInsight('');
            setCharIndexTwo(0);
            setKeyInsightIndex(prev => prev + 1);
          }, 500); // Pause between paragraphs
          
          return () => clearTimeout(timer);
        }
      }, [showKeyinsights, keyInsightIndex, charIndexTwo, keyInsights]);
  
  
  return (
    <div className="md:flex md:justify-center bg-gray-50 min-h-1/2 p-8">
      <div className={`flex flex-col md:flex-row gap-8 transition-all duration-1000 ${ (currentParagraph != '' || completedParagraphs.length > 0) ? 'transform' : ''}`}>
        {/* Preview Section */}
        <div className={`"transition-all duration-1000 ease-in-out self-center"`}>
            { YouTubeInput }
        </div>
        
        {/* Results Section - appears with typewriter effect */}
        {(currentParagraph != '' || completedParagraphs.length > 0) && (
          <div className="bg-white rounded-lg shadow-md p-6 md:w-2/3 relative flex flex-col" ref={resultsRef}>
            {/* handle copy button */}
            { (completedParagraphs.length == summary.length && completedKeyInsights.length == keyInsights.length ) && <div className="self-end">
                <button 
                    onClick={handleCopyResults}
                    className="px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-700 transition cursor-pointer flex items-center"
                    aria-label="Copy results to clipboard"
                >
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" 
                />
                </svg>
                {copied ? 'Copied!' : 'Copy Results'}
                </button>
            </div> }
            <h2 className="text-xl font-bold text-black mb-4">Summary</h2>
            <div className="font-mono whitespace-pre-line ml-4">
            {completedParagraphs.map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
            ))}
            
            {/* Display currently typing paragraph with cursor */}
            {paragraphIndex < summary.length && (
                <p>
                    {currentParagraph}
                </p>
            )}
            {/* <span className="inline-block w-2 h-5 bg-lime-600 ml-1 animate-pulse"></span> */}
            </div>
            { (currentKeyInsight != '' || completedKeyInsights.length > 0) && <h2 className="text-xl font-bold text-black mb-4">Key Insights</h2> }
            <div className="font-mono whitespace-pre-line ml-4">
            { (currentKeyInsight != '' || completedKeyInsights.length > 0) && <ol className="list-decimal pl-6">
                {completedKeyInsights.map((keyinsight, index) => {
                    return <li key={index} className="mb-4">{keyinsight}</li>
                })}
                {/* Display currently typing paragraph with cursor */}
                {keyInsightIndex < keyInsights.length && (
                <li>
                    {currentKeyInsight}
                </li>
                )}
            </ol>}
            </div>
            <div className='ml-5 mt-1'>
                <Loading/>
            </div>
            { (completedParagraphs.length == summary.length && completedKeyInsights.length == keyInsights.length ) && <Feedback />}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;