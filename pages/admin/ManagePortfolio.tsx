
import React, { useState } from 'react';
import { storage } from '../../services/storage';
import { Portfolio, Category } from '../../types';
import Swal from 'sweetalert2';

const AdminPortfolio: React.FC = () => {
  const [data, setData] = useState(storage.getData());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
  
  const [formData, setFormData] = useState<Partial<Portfolio>>({
    title: '',
    description: '',
    imageUrl: '',
    categoryId: data.categories[0]?.id || '',
    link: ''
  });

  const refresh = () => setData(storage.getData());

  const handleOpenModal = (item?: Portfolio) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        categoryId: data.categories[0]?.id || '',
        link: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      storage.updateItem('portfolio', { ...editingItem, ...formData } as Portfolio);
    } else {
      storage.addItem('portfolio', { ...formData, id: Date.now().toString() } as Portfolio);
    }
    setIsModalOpen(false);
    refresh();
    Swal.fire('Berhasil!', 'Data portofolio telah disimpan.', 'success');
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Hapus data?',
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!'
    }).then((result) => {
      if (result.isConfirmed) {
        storage.deleteItem('portfolio', id);
        refresh();
        Swal.fire('Terhapus!', 'Data telah dihapus.', 'success');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kelola Portofolio</h1>
        <button onClick={() => handleOpenModal()} className="bg-gold-500 text-zinc-950 px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-gold-600 transition-all">
          Tambah Portofolio
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-700">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Thumbnail</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Judul Proyek</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Kategori</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-700">
            {data.portfolio.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4">
                  <img src={p.imageUrl} alt={p.title} className="w-16 h-10 object-cover rounded-lg" />
                </td>
                <td className="px-6 py-4 font-semibold">{p.title}</td>
                <td className="px-6 py-4">
                   <span className="px-3 py-1 bg-gold-500/10 text-gold-600 rounded-full text-xs font-bold">
                    {data.categories.find(c => c.id === p.categoryId)?.name}
                   </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleOpenModal(p)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-3xl overflow-hidden">
            <div className="bg-gold-500 p-6 flex justify-between items-center">
               <h2 className="text-xl font-bold text-zinc-950">{editingItem ? 'Edit Portofolio' : 'Tambah Portofolio'}</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-zinc-950 text-2xl"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Judul Proyek</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-transparent focus:border-gold-500 outline-none" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Kategori</label>
                    <select value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-transparent focus:border-gold-500 outline-none">
                       {data.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Link Proyek</label>
                    <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-transparent focus:border-gold-500 outline-none" />
                  </div>
               </div>
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">URL Gambar</label>
                  <input type="text" required value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-transparent focus:border-gold-500 outline-none" />
               </div>
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Deskripsi Singkat</label>
                  <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-transparent focus:border-gold-500 outline-none"></textarea>
               </div>
               <button type="submit" className="w-full bg-gold-500 text-zinc-950 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-600 transition-all mt-4">
                 Simpan Portofolio
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;
