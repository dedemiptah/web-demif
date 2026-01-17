
import React from 'react';
import { storage } from '../../services/storage';
import { SQL_SCHEMA } from '../../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Swal from 'sweetalert2';

const AdminDashboard: React.FC = () => {
  const data = storage.getData();
  
  const stats = [
    { name: 'Portofolio', value: data.portfolio.length, icon: 'fa-briefcase', color: 'bg-blue-500' },
    { name: 'Skills', value: data.skills.length, icon: 'fa-bolt', color: 'bg-yellow-500' },
    { name: 'Pesan', value: data.messages.length, icon: 'fa-envelope', color: 'bg-green-500' },
    { name: 'Testimoni', value: data.testimonials.length, icon: 'fa-quote-left', color: 'bg-purple-500' },
  ];

  const chartData = [
    { name: 'Porto', val: data.portfolio.length },
    { name: 'Skills', val: data.skills.length },
    { name: 'Messages', val: data.messages.length },
    { name: 'Testimoni', val: data.testimonials.length },
  ];

  const COLORS = ['#3b82f6', '#eab308', '#22c55e', '#a855f7'];

  const handleExportSQL = () => {
    Swal.fire({
      title: 'Database Schema (MySQL)',
      html: `<pre class="text-left bg-zinc-900 text-gold-500 p-4 rounded-lg text-[10px] overflow-x-auto max-h-96">${SQL_SCHEMA}</pre>`,
      width: '800px',
      confirmButtonText: 'Copy to Clipboard',
      confirmButtonColor: '#d4af37',
      background: '#18181b',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        navigator.clipboard.writeText(SQL_SCHEMA);
        Swal.fire('Copied!', 'Schema SQL telah disalin.', 'success');
      }
    });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Intelligence</h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400">Security Status: <span className="text-green-500 font-bold">ACTIVE</span> • Last Login: {data.admin.lastLogin}</p>
        </div>
        <button 
          onClick={handleExportSQL}
          className="bg-zinc-900 dark:bg-zinc-800 text-white dark:text-gold-500 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border border-zinc-700 hover:border-gold-500 transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-database"></i> Export SQL Schema
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 flex items-center gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${stat.color} text-white flex items-center justify-center text-lg md:text-xl`}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.name}</p>
              <h3 className="text-xl md:text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-8 opacity-60">Analytics Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="val" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-60 flex items-center gap-2 text-gold-600">
            <i className="fa-solid fa-shield-halved"></i> Security Logs
          </h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {data.logs.map((log) => (
              <div key={log.id} className="flex gap-4 p-3 rounded-xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800">
                 <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                   log.status === 'success' ? 'bg-green-500' : 
                   log.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                 }`}></div>
                 <div>
                    <h4 className="text-[11px] font-bold text-gray-800 dark:text-zinc-200">{log.action}</h4>
                    <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-tighter">{log.timestamp}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
