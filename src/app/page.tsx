import React from 'react';
import { Users, Briefcase, Plus } from 'lucide-react';

async function getEmployees() {
  // Vercel provides VERCEL_URL but without the protocol (https://)
  // We must add it manually for the fetch to work on the server.
  const host = process.env.VERCEL_URL || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const apiEndpoint = `${protocol}://${host}/api/employees`;

  try {
    const res = await fetch(apiEndpoint, {
      cache: 'no-store', // Prevents stale data
    });

    if (!res.ok) {
      console.error(`Backend returned ${res.status}`);
      return [];
    }
    
    return await res.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; 
  }
}

export default async function HomePage() {
  const employees = await getEmployees();

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
        <div className="p-6 text-xl font-bold text-indigo-600">Enterprise EMS</div>
        <nav className="mt-4 px-4">
          <div className="flex items-center space-x-3 p-3 bg-indigo-50 text-indigo-700 rounded-lg">
            <Users size={20} /> <span>Directory</span>
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Workforce Dashboard</h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus size={18} /> <span>New Employee</span>
          </button>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.length > 0 ? (
                employees.map((emp: any) => (
                  <tr key={emp.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{emp.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{emp.department}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase">
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-slate-400">
                    No data received from Python API.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}