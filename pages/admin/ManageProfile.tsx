
import React, { useState } from 'react';
import { storage } from '../../services/storage';
import Swal from 'sweetalert2';

const AdminProfile: React.FC = () => {
  const data = storage.getData();
  const [profile, setProfile] = useState(data.profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storage.updateProfile(profile);
    Swal.fire('Berhasil!', 'Profil telah diperbarui.', 'success');
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">Kelola Profil</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
           <div>
             <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Nama Lengkap</label>
             <input 
              type="text" 
              value={profile.name}
              onChange={e => setProfile({...profile, name: e.target.value})}
              className="w-full bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-gold-500 rounded-xl px-4 py-3"
             />
           </div>
           <div>
             <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Gelar / Posisi</label>
             <input 
              type="text" 
              value={profile.title}
              onChange={e => setProfile({...profile, title: e.target.value})}
              className="w-full bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-gold-500 rounded-xl px-4 py-3"
             />
           </div>
           <div>
             <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Email Utama</label>
             <input 
              type="email" 
              value={profile.email}
              onChange={e => setProfile({...profile, email: e.target.value})}
              className="w-full bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-gold-500 rounded-xl px-4 py-3"
             />
           </div>
           <div>
             <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Nomor Telepon</label>
             <input 
              type="text" 
              value={profile.phone}
              onChange={e => setProfile({...profile, phone: e.target.value})}
              className="w-full bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-gold-500 rounded-xl px-4 py-3"
             />
           </div>
        </div>

        <div className="mb-8">
           <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Tentang Saya</label>
           <textarea 
            rows={4}
            value={profile.about}
            onChange={e => setProfile({...profile, about: e.target.value})}
            className="w-full bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-gold-500 rounded-xl px-4 py-3"
           ></textarea>
        </div>

        <div className="mb-8">
           <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">URL Foto Profil</label>
           <input 
            type="text" 
            value={profile.photoUrl}
            onChange={e => setProfile({...profile, photoUrl: e.target.value})}
            className="w-full bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-gold-500 rounded-xl px-4 py-3"
            placeholder="https://example.com/photo.jpg"
           />
           <img src={profile.photoUrl} alt="Preview" className="mt-4 w-32 h-32 rounded-xl object-cover border" />
        </div>

        <button type="submit" className="bg-gold-500 text-zinc-950 px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-600 transition-all">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
