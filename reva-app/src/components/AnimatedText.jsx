import React from 'react';
import './AnimatedText.css';

const AnimatedText = ({ words }) => {
  return (
    <span className="animated-text-wrapper">
      <span className="animated-words">
        {words.map((word, index) => (
          <span key={index} className="animated-word">
            {word}
          </span>
        ))}
      </span>
    </span>
  );
};

export default AnimatedText;
