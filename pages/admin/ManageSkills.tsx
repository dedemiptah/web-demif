
import React, { useState } from 'react';
import { storage } from '../../services/storage';
import { Skill } from '../../types';
import Swal from 'sweetalert2';

const AdminSkills: React.FC = () => {
  const [data, setData] = useState(storage.getData());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Skill | null>(null);
  
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    percentage: 80,
    category: 'Frontend'
  });

  const refresh = () => setData(storage.getData());

  const handleOpenModal = (item?: Skill) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ name: '', percentage: 80, category: 'Frontend' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      storage.updateItem('skills', { ...editingItem, ...formData } as Skill);
    } else {
      storage.addItem('skills', { ...formData, id: Date.now().toString() } as Skill);
    }
    setIsModalOpen(false);
    refresh();
    Swal.fire('Berhasil!', 'Data skill telah disimpan.', 'success');
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Hapus skill?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!'
    }).then((result) => {
      if (result.isConfirmed) {
        storage.deleteItem('skills', id);
        refresh();
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kelola Skills</h1>
        <button onClick={() => handleOpenModal()} className="bg-gold-500 text-zinc-950 px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-gold-600 transition-all">
          Tambah Skill
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.skills.map((s) => (
          <div key={s.id} className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-1">{s.category}</p>
              <h3 className="text-lg font-bold">{s.name}</h3>
              <p className="text-sm font-semibold">{s.percentage}%</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleOpenModal(s)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                <i className="fa-solid fa-pen"></i>
              </button>
              <button onClick={() => handleDelete(s.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gold-500 p-6 flex justify-between items-center">
               <h2 className="text-xl font-bold text-zinc-950">{editingItem ? 'Edit Skill' : 'Tambah Skill'}</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-zinc-950 text-2xl"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Nama Skill</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-transparent focus:border-gold-500 outline-none" />
               </div>
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Kategori</label>
                  <input type="text" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-transparent focus:border-gold-500 outline-none" placeholder="Frontend, Backend, etc" />
               </div>
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Persentase ({formData.percentage}%)</label>
                  <input type="range" min="0" max="100" value={formData.percentage} onChange={e => setFormData({...formData, percentage: parseInt(e.target.value)})} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold-500" />
               </div>
               <button type="submit" className="w-full bg-gold-500 text-zinc-950 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-600 transition-all mt-4">
                 Simpan Skill
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSkills;
