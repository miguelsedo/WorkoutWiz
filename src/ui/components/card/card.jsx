import React from 'react';
import './card.css'; 

const CustomCard = ({ firstContent, secondContent, thirdContent }) => {
    return (
      <div className="card">
        <div className="first-content">
          {firstContent}
        </div>
        <div className="second-content">
          {secondContent}
        </div>        
        <div className="second-content">
          {thirdContent}
        </div>
      </div>
    );
  };
  
export default CustomCard;

