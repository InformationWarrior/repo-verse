import React from "react";

export default function YoloBlastGameLayout() {
  return (
    <div className="blast-page relative flex h-full min-h-[90vh] max-w-[1440px] flex-col bg-gray-300">
      <div className="game-container grid grid-cols-[288px_1fr_360px] gap-1 p-1">
        {/* Column 1: Players */}
        <div className="players col-start-1 row-start-1 border border-white">
          Player Stats Area
        </div>

        {/* Column 2: Spin Wheel (row 1) + Round Contents (row 2) */}
        <div className="col-start-2 grid grid-rows-[auto_1fr] gap-1">
          <div className="spin-wheel row-start-1 border border-white">
            Spin Wheel Area
          </div>
          <div className="round-contents row-start-2 border border-white">
            Round Contents Area
          </div>
        </div>

        {/* Column 3: Current Round (row 1) + Bet Panel (row 2) */}
        <div className="col-start-3 grid grid-rows-[auto_1fr] gap-1">
          <div className="current-round row-start-1 border border-white">
            Current Round Area
          </div>
          <div className="bet-panel row-start-2 border border-white">
            Bet Panel Area
          </div>
        </div>
      </div>
    </div>
  );
}
