import React from 'react';
import './AnimatedText.css';

const AnimatedText = ({ words, hasGradient = false }) => {
  return (
    <span className="animated-text-wrapper">
      <span className="animated-words">
        {words.map((word, index) => (
          <span key={index} className="animated-word">
            {hasGradient ? (
              <span className="relative inline-flex sm:inline">
                <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                <span className="relative"> {word} </span>
              </span>
            ) : (
              <> {word}</>
            )}
          </span>
        ))}
      </span>
    </span>
  );
};

export default AnimatedText;
