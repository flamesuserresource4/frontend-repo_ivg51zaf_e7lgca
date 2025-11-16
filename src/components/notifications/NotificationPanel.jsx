import React, { useState } from 'react';
import { Bell, Check, Clock, Snooze } from 'lucide-react';

export default function NotificationPanel({ open, setOpen }) {
  const [count, setCount] = useState(2);

  const items = [
    { id: 1, name: 'Amoxicillin', dose: '1 tablet', time: '8:00 AM', overdue: false },
    { id: 2, name: 'Vitamin D', dose: '2 drops', time: '9:30 AM', overdue: true },
  ];

  const markTaken = (id) => {
    setCount((c) => Math.max(0, c - 1));
  };

  return (
    <div className="relative">
      <button
        className="relative h-9 w-9 grid place-items-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
        aria-label="Notifications"
        onClick={() => setOpen(!open)}
      >
        <Bell size={18} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-blue-600 text-white text-[11px] grid place-items-center">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-50">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-sm font-semibold text-slate-800">Upcoming Reminders</span>
            <button className="text-xs text-slate-500 hover:text-slate-700" onClick={() => setOpen(false)}>Close</button>
          </div>
          <div className="divide-y divide-slate-100 max-h-80 overflow-auto">
            {items.length === 0 ? (
              <div className="p-4 text-center text-slate-500">All caught up!</div>
            ) : (
              items.map((r) => (
                <div key={r.id} className={`p-3 flex items-center gap-3 ${r.overdue ? 'bg-red-50' : ''}`}>
                  <div className={`h-9 w-9 grid place-items-center rounded-md ${r.overdue ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                    <Clock size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-800">{r.name}</div>
                    <div className="text-xs text-slate-500">{r.dose} • {r.time}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200" aria-label="Snooze">Snooze</button>
                    <button onClick={() => markTaken(r.id)} className="text-xs px-2 py-1 rounded bg-emerald-500 text-white hover:brightness-110" aria-label="Mark as taken">Taken</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
