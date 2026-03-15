import React from 'react';
import { Users, Briefcase, Clock, TrendingUp, Search, Plus } from 'lucide-react';

// This function fetches data from your Python API
async function getEmployees() {
  // When deployed on Vercel, /api/employees will hit your index.py
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/api/employees`, {
    cache: 'no-store' // This ensures we always get fresh data
  });
  
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const employees = await getEmployees();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
        <div className="p-6">
          <h1 className="text-xl font-bold text-indigo-600 tracking-tight">Enterprise EMS</h1>
        </div>
        <nav className="mt-4 px-4 space-y-2">
          <a href="#" className="flex items-center space-x-3 p-3 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
            <Users size={20} /> <span>Dashboard</span>
          </a>
          {/* Other links... */}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Workforce Directory</h2>
            <p className="text-slate-500 text-sm">System Status: <span className="text-emerald-600 font-medium">Connected to Python API</span></p>
          </div>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm">
            <Plus size={18} /> <span>Add Employee</span>
          </button>
        </header>

        {/* Dynamic Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Employee Name</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((emp: any) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                      {emp.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <span className="font-medium text-slate-700">{emp.name}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{emp.department}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      emp.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{emp.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
