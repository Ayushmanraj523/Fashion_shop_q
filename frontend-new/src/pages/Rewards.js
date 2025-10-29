import React from 'react';

const Rewards = () => {
  return (
    <div className="empty-page">
      <div className="empty-content">
        <div className="empty-icon">🎁</div>
        <h2>No Rewards Yet</h2>
        <p>Complete purchases and refer friends to earn reward points!</p>
        <button className="cta-button" onClick={() => window.location.href = '/'}>
          Start Earning
        </button>
      </div>
    </div>
  );
};

export default Rewards;