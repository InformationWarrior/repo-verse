import React from "react";

function YoloBlastGameLayout() {
  return (
    <div className="blast-page flex">
      <div className="game-container grid grid-cols-2 border-2 border-black">
        <div className="player-stat">
          <p>Player Stats Section</p>
        </div>
        <div className="spin-wheel">
          <p>Spin Wheel Section</p>
        </div>
        <div className="round-contents">
          <p>Round Content Section</p>
        </div>
        <div className="current-round">
          <p>Current Round Section</p>
        </div>
        <div className="bet-panel">
          <p>Bet Panel Section</p>
        </div>
      </div>
    </div>
  );
}

export default YoloBlastGameLayout;