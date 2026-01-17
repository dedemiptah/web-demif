
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { storage } from '../../services/storage';
import { security } from '../../services/security';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = storage.getData();
    const inputHash = await security.hashPassword(password);

    if (username === data.admin.username && inputHash === data.admin.passwordHash) {
      localStorage.setItem('admin_session', 'true');
      
      // Update last login
      data.admin.lastLogin = new Date().toLocaleString();
      storage.saveData(data);
      storage.addLog(`Login Berhasil: ${username}`, 'success');

      Swal.fire({
        title: 'Akses Diterima!',
        text: 'Enkripsi valid. Selamat datang.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#18181b',
        color: '#fff'
      }).then(() => navigate('/admin/dashboard'));
    } else {
      storage.addLog(`Percobaan Login Gagal: ${username}`, 'warning');
      Swal.fire({
        title: 'Akses Ditolak!',
        text: 'Kredensial tidak cocok dengan database kami.',
        icon: 'error',
        confirmButtonColor: '#d4af37'
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800">
        <div className="bg-gradient-to-r from-gold-600 to-gold-400 p-10 text-center">
          <div className="w-16 h-16 bg-zinc-950 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
             <i className="fa-solid fa-shield-halved text-gold-500 text-3xl"></i>
          </div>
          <h1 className="text-2xl font-serif font-bold text-zinc-950 uppercase tracking-tighter">Secure Admin Gateway</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-900/60 mt-2">Dede Miptah Parid Awaludin</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-10">
          <div className="mb-6">
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-zinc-500">Administrator Identity</label>
            <div className="relative">
              <i className="fa-solid fa-user-shield absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50"></i>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-zinc-950 text-white border border-zinc-800 focus:border-gold-500 rounded-2xl transition-all outline-none text-sm"
                placeholder="Username"
                required
              />
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-zinc-500">Security Token (Password)</label>
            <div className="relative">
              <i className="fa-solid fa-key absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50"></i>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-zinc-950 text-white border border-zinc-800 focus:border-gold-500 rounded-2xl transition-all outline-none text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gold-500 text-zinc-950 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-gold-400 transition-all shadow-xl shadow-gold-500/10 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Authorize Access'}
          </button>
          
          <div className="mt-8 text-center flex flex-col gap-3">
            <p className="text-[9px] text-zinc-600 uppercase tracking-widest">Encrypted with SHA-256 Security Protocol</p>
            <a href="#/" className="text-xs font-bold text-zinc-500 hover:text-gold-500 transition-colors flex items-center justify-center gap-2">
              <i className="fa-solid fa-arrow-left"></i> Return to Public Site
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
