import React from 'react';
import { Clock, Pill, Syringe, Sun, Moon, CloudSun, SunMedium, AlertTriangle, CalendarDays, ChevronRight } from 'lucide-react';

const doseIcons = {
  morning: SunMedium,
  afternoon: CloudSun,
  evening: Sun,
  night: Moon,
};

function TimelineItem({ time, name, dose, overdue }) {
  const Icon = overdue ? AlertTriangle : Clock;
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${overdue ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-white'} shadow-sm`}>
      <div className={`h-9 w-9 grid place-items-center rounded-md ${overdue ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-slate-800">{name}</div>
        <div className="text-xs text-slate-500">{dose} • {time}</div>
      </div>
      <div className="flex items-center gap-2">
        <button className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200">Snooze</button>
        <button className="text-xs px-2 py-1 rounded bg-emerald-500 text-white hover:brightness-110">Taken</button>
      </div>
    </div>
  );
}

function MedicineCard({ name, type='Pill', dosage='1 tablet', schedule=['morning','night'], progress=0.6, expiry='2025-05-20', category='blue' }) {
  const TypeIcon = type === 'Injection' ? Syringe : Pill;
  const borderColor = category === 'blue' ? 'border-blue-500' : category === 'teal' ? 'border-teal-500' : 'border-amber-500';
  const daysLeft = 42; // demo
  const expiryState = daysLeft < 0 ? 'expired' : daysLeft <= 7 ? '7' : daysLeft <= 30 ? '30' : 'ok';
  const expiryColor = expiryState==='expired' ? 'text-red-600' : expiryState==='7' ? 'text-amber-600' : expiryState==='30' ? 'text-yellow-600' : 'text-slate-600';

  return (
    <div className={`relative rounded-xl bg-white border ${borderColor} border-l-4 shadow-sm p-4 transition hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[17px] font-semibold text-slate-800">{name}</div>
          <div className="mt-1 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600"><TypeIcon size={14}/> {type}</div>
        </div>
        <button className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white shadow hover:brightness-110">Take Now</button>
      </div>
      <div className="mt-3 text-sm text-slate-700">{dosage}</div>
      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
        {schedule.map((s) => {
          const I = doseIcons[s];
          return <span key={s} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100"><I size={14}/> {s}</span>;
        })}
      </div>
      <div className="mt-3">
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-teal-400" style={{ width: `${Math.round(progress*100)}%` }} />
        </div>
        <div className="mt-1 text-xs text-slate-500 tabular-nums">{Math.round(progress*100)}% complete</div>
      </div>
      <div className="mt-3 text-xs flex items-center justify-between">
        <div className={`${expiryColor}`}>Expiry: {expiry}</div>
        <button className="text-blue-600 hover:underline inline-flex items-center gap-1">View Details <ChevronRight size={14}/></button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-slate-800">Today's Schedule</h2>
            <button className="text-sm text-slate-600 hover:text-blue-600">See all</button>
          </div>
          <div className="grid gap-3">
            <TimelineItem time="8:00 AM" name="Metformin" dose="500mg" overdue={false} />
            <TimelineItem time="9:30 AM" name="Vitamin D" dose="2 drops" overdue />
            <TimelineItem time="1:00 PM" name="Amoxicillin" dose="1 tablet" overdue={false} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-slate-800">Active Medicines</h2>
            <div className="flex items-center gap-2 text-sm">
              <button className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">All</button>
              <button className="px-3 py-1 rounded-full bg-amber-100 text-amber-700">Expiring Soon</button>
              <button className="px-3 py-1 rounded-full bg-teal-100 text-teal-700">Running Low</button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <MedicineCard name="Metformin" dosage="500mg after breakfast" schedule={['morning']} progress={0.35} category="blue" />
            <MedicineCard name="Vitamin D" type="Drops" dosage="2 drops" schedule={['morning']} progress={0.8} category="teal" />
            <MedicineCard name="Amoxicillin" dosage="1 tablet" schedule={['morning','night']} progress={0.5} category="amber" />
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3">Quick Actions</h3>
          <button className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white shadow hover:brightness-110">Scan Medicine</button>
          <button className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50">Add manually</button>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3">Expiry Alerts</h3>
          <div className="space-y-2">
            <div className="p-3 rounded-lg border-l-4 border-amber-500 bg-amber-50 text-sm">Metformin expiring in 20 days</div>
            <div className="p-3 rounded-lg border-l-4 border-red-500 bg-red-50 text-sm">Cough Syrup expired</div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3">Recent Activity</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Took Metformin at 8:05 AM</li>
            <li>Snoozed Vitamin D for 30 mins</li>
            <li>Added Amoxicillin to schedule</li>
          </ul>
        </div>
      </aside>
    </section>
  );
}
