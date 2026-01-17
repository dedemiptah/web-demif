
import React, { useState } from 'react';
import { storage } from '../../services/storage';
import { SocialMedia } from '../../types';
import Swal from 'sweetalert2';

const AdminSocials: React.FC = () => {
  const [data, setData] = useState(storage.getData());

  const handleUpdate = (id: string, url: string) => {
    const updatedSocials = data.socials.map(s => {
      if (s.id === id) return { ...s, url };
      return s;
    });
    storage.saveData({ ...data, socials: updatedSocials });
    setData(storage.getData());
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Update Berhasil',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Media Sosial Dinamis</h1>
      <div className="space-y-6">
        {data.socials.map((s) => (
          <div key={s.id} className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-500 text-zinc-950 flex items-center justify-center text-lg">
                <i className={s.icon}></i>
              </div>
              <h3 className="font-bold">{s.platform}</h3>
            </div>
            <div className="flex gap-4">
              <input 
                type="text" 
                defaultValue={s.url}
                onBlur={(e) => handleUpdate(s.id, e.target.value)}
                className="flex-1 bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-gold-500 rounded-xl px-4 py-2 outline-none"
                placeholder={`Link ${s.platform}...`}
              />
              <button className="bg-zinc-900 text-white dark:bg-zinc-700 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
                Update
              </button>
            </div>
            {s.platform === 'WhatsApp' && (
              <p className="mt-2 text-[10px] text-gray-400 font-medium italic">Format: https://wa.me/628xxxx</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSocials;
