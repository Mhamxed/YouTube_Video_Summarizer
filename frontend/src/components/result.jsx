import React, { useState, useEffect } from 'react';
import Loading from './loading';

const ResultsDisplay = ({ summary, keyInsights, YouTubeInput, showResults }) => {
    const [completedParagraphs, setCompletedParagraphs] = useState([]);
    const [currentParagraph, setCurrentParagraph] = useState('');
    const [paragraphIndex, setParagraphIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const [showKeynsights, setShowKeynsights] = useState(false);
    const [completedKeyInsights, setCompletedKeyInsights] = useState([]);
    const [currentKeyInsight, setCurrentKeyInsight] = useState('');
    const [keyInsighIndex, setKeyInsighIndex] = useState(0);

  // Typewriter effect for paragraphs
  useEffect(() => {
    if (!showResults || paragraphIndex >= summary.length) {
        if (paragraphIndex >= summary.length) {
            setShowKeynsights(true)
            return
        }
        return
    };
    
    const currentFullParagraph = summary[paragraphIndex];
    
    if (charIndex < currentFullParagraph.length) {
      // Still typing the current paragraph
      const typingSpeed = 
        currentFullParagraph[charIndex] === '.' ? 150 : 
        currentFullParagraph[charIndex] === ',' ? 100 : 25;
      
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
        if (!showKeynsights || keyInsighIndex >= keyInsights.length) return;
        
        const currentFullKeyInsight = keyInsights[keyInsighIndex];
        
        if (charIndex < currentFullKeyInsight.length) {
          // Still typing the current paragraph
          const typingSpeed = 
          currentFullKeyInsight[charIndex] === '.' ? 150 : 
          currentFullKeyInsight[charIndex] === ',' ? 100 : 5;
          
          const timer = setTimeout(() => {
            setCurrentKeyInsight(prev => prev + currentFullKeyInsight[charIndex]);
            setCharIndex(prev => prev + 1);
          }, typingSpeed);
          
          return () => clearTimeout(timer);
        } else {
          // Finished typing the current paragraph
          const timer = setTimeout(() => {
            // Add the completed paragraph to our array
            setCompletedKeyInsights(prev => [...prev, currentKeyInsight]);
            // Reset for the next paragraph
            setCurrentKeyInsight('');
            setCharIndex(0);
            setKeyInsighIndex(prev => prev + 1);
          }, 500); // Pause between paragraphs
          
          return () => clearTimeout(timer);
        }
      }, [showKeynsights, keyInsighIndex, charIndex, keyInsights]);
  
  
  return (
    <div className="md:flex md:justify-center bg-gray-50 min-h-1/2 p-8">
      <div className={`flex flex-col md:flex-row gap-8 transition-all duration-1000 ${showResults ? 'transform' : ''}`}>
        {/* Preview Section */}
        <div className={`"transition-all duration-1000 ease-in-out self-center"`}>
            { YouTubeInput }
        </div>
        
        {/* Results Section - appears with typewriter effect */}
        {showResults && (
          <div className="bg-white rounded-lg shadow-md p-6 md:w-2/3 relative">
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
            { showKeynsights && <h2 className="text-xl font-bold text-black mb-4">Key Insights</h2> }
            <div className="font-mono whitespace-pre-line ml-4">
            { showKeynsights && <ol className="list-decimal pl-6">
                {completedKeyInsights.map((keyinsight, index) => {
                    return <li key={index} className="mb-4">{keyinsight}</li>
                })}
                {/* Display currently typing paragraph with cursor */}
                {keyInsighIndex < keyInsights.length && (
                <li>
                    {currentKeyInsight}
                </li>
                )}
            </ol>}
            </div>
            <div className='ml-5 mt-1'>
                <Loading/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;