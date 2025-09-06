import React from "react";

export default function YoloBlastGameLayout() {
  return (
    <div className="blast-page relative flex h-full min-h-[90vh] max-w-[1440px] flex-col mx-auto bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <div className="game-container grid min-h-screen grid-cols-[288px_1fr_360px] gap-3 p-4">
        {/* Column 1: Players */}
        <section className="flex flex-col col-start-1 row-start-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-lg shadow-black/20 p-2">
          <header className="mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-300/90">
              Players
            </h2>
            <p className="text-xs text-slate-300/80">
              Live player stats & activity
            </p>
          </header>
          <div className="rounded-xl h-full min-h-[320px] bg-gradient-to-b from-slate-800/40 to-slate-800/10 border border-white/10 p-3">
            Player Stats Area
          </div>
        </section>

        {/* Column 2: Spin Wheel (row 1) + Round Contents (row 2) */}
        <div className="col-start-2 grid h-full grid-rows-[3fr_1fr] gap-3">
          <section className="row-start-1 flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-lg shadow-black/20 p-4">
            <header className="mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                Spin Wheel
              </h2>
              <p className="text-xs text-slate-300/80">
                Tap to spin & win multipliers
              </p>
            </header>
            <div className="rounded-xl flex-1 min-h-0 h-full bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.12),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12),transparent_40%)] border border-white/10 p-3">
              Spin Wheel Area
            </div>
          </section>

          <section
            className="flex flex-col row-start-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur
 shadow-lg shadow-black/20 p-4"
          >
            <header className="mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-cyan-300/90">
                Round
              </h2>
              <p className="text-xs text-slate-300/80">
                Recent results & details
              </p>
            </header>
            <div className="rounded-xl h-full bg-slate-800/20 border border-white/10 p-3">
              Round Contents Area
            </div>
          </section>
        </div>

        {/* Column 3: Current Round (row 1) + Bet Panel (row 2) */}
        <div className="col-start-3 grid h-full grid-rows-[1fr_2fr] gap-3">
          <section className="flex flex-col row-start-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-lg shadow-black/20 p-4">
            <header className="mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-fuchsia-300/90">
                Current Round
              </h2>
              <p className="text-xs text-slate-300/80">Status & timer</p>
            </header>
            <div className="rounded-xl h-full bg-slate-800/20 border border-white/10 p-3">
              Current Round Area
            </div>
          </section>

          <section
            className="flex flex-col row-start-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur
                              shadow-lg shadow-black/20 p-4"
          >
            <header className="mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-300/90">
                Bet Panel
              </h2>
              <p className="text-xs text-slate-300/80">
                Place & manage your bets
              </p>
            </header>
            <div className="rounded-xl h-full bg-slate-800/20 border border-white/10 p-3">
              Bet Panel Area
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
