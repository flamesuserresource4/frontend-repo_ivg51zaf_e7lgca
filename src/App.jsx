import React, { useState } from 'react';
import TopNav from './components/TopNav';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ScanModal from './components/ScanModal';

function App() {
  const [scanOpen, setScanOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <TopNav onOpenScan={() => setScanOpen(true)} />
      <Hero onOpenScan={() => setScanOpen(true)} />
      <Dashboard />
      <ScanModal open={scanOpen} onClose={() => setScanOpen(false)} />
    </div>
  );
}

export default App;
