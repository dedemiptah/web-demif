
import React, { useState } from 'react';
import { storage } from '../../services/storage';
import Swal from 'sweetalert2';

const AdminMessages: React.FC = () => {
  const [data, setData] = useState(storage.getData());
  
  const refresh = () => setData(storage.getData());

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Hapus pesan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!'
    }).then((result) => {
      if (result.isConfirmed) {
        storage.deleteItem('messages', id);
        refresh();
      }
    });
  };

  const toggleRead = (id: string) => {
    const updatedMessages = data.messages.map(m => {
      if (m.id === id) return { ...m, isRead: !m.isRead };
      return m;
    });
    storage.saveData({ ...data, messages: updatedMessages });
    refresh();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pesan Masuk</h1>
      
      <div className="space-y-4">
        {data.messages.length === 0 ? (
          <div className="bg-white dark:bg-zinc-800 p-12 text-center rounded-2xl border border-dashed border-gray-300">
            <i className="fa-solid fa-envelope-open text-4xl text-gray-300 mb-4 block"></i>
            <p className="text-gray-500">Belum ada pesan yang masuk.</p>
          </div>
        ) : (
          data.messages.map((m) => (
            <div key={m.id} className={`p-6 rounded-2xl border transition-all ${m.isRead ? 'bg-white dark:bg-zinc-800 border-gray-100 dark:border-zinc-700' : 'bg-gold-50 dark:bg-gold-500/5 border-gold-200 dark:border-gold-500/20'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold">{m.name}</h3>
                    <p className="text-xs text-gray-500">{m.email} • {m.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleRead(m.id)} className="p-2 text-gray-400 hover:text-gold-500">
                    <i className={`fa-solid ${m.isRead ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                  <button onClick={() => handleDelete(m.id)} className="p-2 text-gray-400 hover:text-red-500">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-2">Subjek: {m.subject}</h4>
                <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {m.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
