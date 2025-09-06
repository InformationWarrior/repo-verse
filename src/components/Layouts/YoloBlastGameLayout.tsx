import React from "react";

export default function YoloBlastGameLayout() {
  return (
    <div className="blast-page relative mx-auto flex min-h-[90vh] max-w-[1440px] flex-col bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 text-slate-50">
      <div className="game-container grid min-h-screen grid-cols-[288px_1fr_360px] gap-4 p-5">
        {/* Column 1: Players */}
        <section className="col-start-1 row-start-1 flex flex-col overflow-hidden rounded-2xl border border-white/30 bg-white/20 p-4 shadow-lg shadow-black/10 backdrop-blur-sm">
          <header className="mb-3 shrink-0">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
              Players
            </h2>
            <p className="text-xs text-slate-100/80">
              Live player stats & activity
            </p>
          </header>
          <div className="min-h-[260px] flex-1 rounded-xl border border-white/30 p-3 bg-gradient-to-b from-slate-300/20 to-slate-300/5">
            Player Stats Area
          </div>
        </section>

        {/* Column 2: Spin Wheel (row 1) + Round Contents (row 2) */}
        <div className="col-start-2 grid min-h-0 grid-rows-[minmax(0,3fr)_minmax(0,1fr)] gap-4">
          <section className="row-start-1 flex flex-col overflow-hidden rounded-2xl border border-white/30 bg-white/20 p-4 shadow-lg shadow-black/10 backdrop-blur-sm">
            <header className="mb-3 shrink-0">
              <h2 className="bg-gradient-to-r from-cyan-200 to-emerald-200 bg-clip-text text-sm font-semibold uppercase tracking-widest text-transparent">
                Spin Wheel
              </h2>
              <p className="text-xs text-slate-100/80">
                Tap to spin & win multipliers
              </p>
            </header>
            <div className="flex-1 min-h-0 rounded-xl border border-white/30 p-3 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.18),transparent_40%)]">
              Spin Wheel Area
            </div>
          </section>

          <section className="row-start-2 flex flex-col overflow-hidden rounded-2xl border border-white/30 bg-white/20 p-4 shadow-lg shadow-black/10 backdrop-blur-sm">
            <header className="mb-3 shrink-0">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-cyan-200">
                Round
              </h2>
              <p className="text-xs text-slate-100/80">
                Recent results & details
              </p>
            </header>
            <div className="flex-1 min-h-0 rounded-xl border border-white/30 bg-slate-200/20 p-3">
              Round Contents Area
            </div>
          </section>
        </div>

        {/* Column 3: Current Round (row 1) + Bet Panel (row 2) */}
        <div className="col-start-3 grid min-h-0 grid-rows-[minmax(0,1fr)_minmax(0,2fr)] gap-4">
          <section className="row-start-1 flex flex-col overflow-hidden rounded-2xl border border-white/30 bg-white/20 p-4 shadow-lg shadow-black/10 backdrop-blur-sm">
            <header className="mb-3 shrink-0">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-fuchsia-200">
                Current Round
              </h2>
              <p className="text-xs text-slate-100/80">Status & timer</p>
            </header>
            <div className="flex-1 min-h-0 rounded-xl border border-white/30 bg-slate-200/20 p-3">
              Current Round Area
            </div>
          </section>

          <section className="row-start-2 flex flex-col overflow-hidden rounded-2xl border border-white/30 bg-white/20 p-4 shadow-lg shadow-black/10 backdrop-blur-sm">
            <header className="mb-3 shrink-0">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-200">
                Bet Panel
              </h2>
              <p className="text-xs text-slate-100/80">
                Place & manage your bets
              </p>
            </header>
            <div className="flex-1 min-h-0 rounded-xl border border-white/30 bg-slate-200/20 p-3">
              Bet Panel Area
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
