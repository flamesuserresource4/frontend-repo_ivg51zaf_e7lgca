import React, { useState } from 'react';
import { Bell, Menu, User, Pill, History, Settings, ScanLine, X } from 'lucide-react';
import NotificationPanel from './notifications/NotificationPanel';

const NavItem = ({ label, active }) => (
  <button
    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
      active ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
    }`}
    aria-current={active ? 'page' : undefined}
  >
    {label}
  </button>
);

export default function TopNav({ onOpenScan }) {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md bg-gradient-to-tr from-blue-600 to-teal-400 grid place-items-center text-white shadow-md">
            <Pill size={20} />
          </div>
          <span className="font-semibold text-slate-800">MediTrack</span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <NavItem label="Dashboard" active />
          <NavItem label="My Medicines" />
          <NavItem label="Scan Medicine" />
          <NavItem label="History" />
          <NavItem label="Settings" />
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenScan}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm shadow hover:brightness-110 active:scale-[0.98] transition"
            aria-label="Scan Medicine"
          >
            <ScanLine size={18} />
            Scan
          </button>

          <NotificationPanel open={open} setOpen={setOpen} />

          <button
            className="h-9 w-9 grid place-items-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
            aria-label="User Profile"
          >
            <User size={18} />
          </button>

          <button
            className="md:hidden h-9 w-9 grid place-items-center rounded-lg bg-slate-100 text-slate-700"
            aria-label="Open Menu"
            onClick={() => setShowMenu(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {showMenu && (
        <div className="fixed inset-0 z-50 bg-black/40" role="dialog" aria-modal>
          <div className="ml-auto h-full w-80 bg-white shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-blue-600 to-teal-400 grid place-items-center text-white">
                  <Pill size={18} />
                </div>
                <span className="font-semibold text-slate-800">MediTrack</span>
              </div>
              <button
                className="h-9 w-9 grid place-items-center rounded-lg bg-slate-100"
                aria-label="Close Menu"
                onClick={() => setShowMenu(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"><History size={16}/> Dashboard</button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"><Pill size={16}/> My Medicines</button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700" onClick={() => { setShowMenu(false); onOpenScan?.(); }}><ScanLine size={16}/> Scan Medicine</button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"><History size={16}/> History</button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"><Settings size={16}/> Settings</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
