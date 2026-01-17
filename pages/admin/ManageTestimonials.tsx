
import React, { useState } from 'react';
import { storage } from '../../services/storage';
import { Testimonial } from '../../types';
import Swal from 'sweetalert2';

const AdminTestimonials: React.FC = () => {
  const [data, setData] = useState(storage.getData());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    content: '',
    avatarUrl: 'https://picsum.photos/seed/person/100/100'
  });

  const refresh = () => setData(storage.getData());

  const handleOpenModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ name: '', role: '', content: '', avatarUrl: 'https://picsum.photos/seed/person/100/100' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      storage.updateItem('testimonials', { ...editingItem, ...formData } as Testimonial);
    } else {
      storage.addItem('testimonials', { ...formData, id: Date.now().toString() } as Testimonial);
    }
    setIsModalOpen(false);
    refresh();
    Swal.fire('Berhasil!', 'Data testimoni disimpan.', 'success');
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Hapus testimoni?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!'
    }).then((result) => {
      if (result.isConfirmed) {
        storage.deleteItem('testimonials', id);
        refresh();
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kelola Testimoni</h1>
        <button onClick={() => handleOpenModal()} className="bg-gold-500 text-zinc-950 px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-gold-600 transition-all">
          Tambah Testimoni
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {data.testimonials.map((t) => (
          <div key={t.id} className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700">
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-4">
                <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full border border-gold-500" />
                <div>
                  <h3 className="font-bold">{t.name}</h3>
                  <p className="text-xs text-gold-600 font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleOpenModal(t)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button onClick={() => handleDelete(t.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-zinc-400 italic">"{t.content}"</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gold-500 p-6 flex justify-between items-center">
               <h2 className="text-xl font-bold text-zinc-950">{editingItem ? 'Edit Testimoni' : 'Tambah Testimoni'}</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-zinc-950 text-2xl"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Nama Pemberi</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-transparent focus:border-gold-500 outline-none" />
               </div>
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Jabatan / Perusahaan</label>
                  <input type="text" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-transparent focus:border-gold-500 outline-none" />
               </div>
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">URL Avatar</label>
                  <input type="text" required value={formData.avatarUrl} onChange={e => setFormData({...formData, avatarUrl: e.target.value})} className="w-full bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-transparent focus:border-gold-500 outline-none" />
               </div>
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Isi Testimoni</label>
                  <textarea rows={4} required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-transparent focus:border-gold-500 outline-none"></textarea>
               </div>
               <button type="submit" className="w-full bg-gold-500 text-zinc-950 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-600 transition-all mt-4">
                 Simpan Testimoni
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
