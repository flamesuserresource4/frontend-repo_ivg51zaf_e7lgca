import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero({ onOpenScan, userName = 'Alex' }) {
  return (
    <section className="relative pt-16">{/* offset for fixed nav */}
      <div className="relative h-[360px] md:h-[440px] w-full overflow-hidden">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-transparent pointer-events-none" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 flex items-center">
          <div className="max-w-xl text-white">
            <p className="text-sm uppercase tracking-widest text-teal-300/90 mb-2">Medicine Tracker</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Welcome back, {userName}.</h1>
            <p className="mt-3 text-slate-200/90 max-w-prose">Stay on top of your medications with smart reminders, quick scanning, and clear progress tracking designed to keep you healthy and confident.</p>
            <div className="mt-6 flex items-center gap-3">
              <button onClick={onOpenScan} className="px-5 py-3 rounded-xl bg-blue-600 shadow-lg hover:brightness-110 active:scale-[0.98] transition">Scan a Medicine</button>
              <button className="px-5 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur hover:bg-white/20 transition">Add manually</button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="max-w-7xl mx-auto -mt-12 px-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{label:'Active Medicines',value:'8'},{label:'Doses Today',value:'5'},{label:'Expiring Soon',value:'2'}].map((s,idx)=> (
          <div key={s.label} className={`rounded-xl p-4 text-white shadow-md ${idx===0?'bg-gradient-to-tr from-blue-600 to-teal-500': idx===1?'bg-gradient-to-tr from-blue-500 to-indigo-500':'bg-gradient-to-tr from-amber-500 to-red-500'}`}>
            <div className="text-xs uppercase tracking-wide opacity-90">{s.label}</div>
            <div className="text-3xl font-semibold tabular-nums mt-1">{s.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
