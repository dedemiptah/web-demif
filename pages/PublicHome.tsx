
import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { AppData, Message } from '../types';
import Swal from 'sweetalert2';

const PublicHome: React.FC = () => {
  const [data, setData] = useState<AppData>(storage.getData());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const filteredPortfolio = activeCategory === 'all' 
    ? data.portfolio 
    : data.portfolio.filter(p => p.categoryId === activeCategory);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire('Oops!', 'Mohon lengkapi semua field wajib.', 'error');
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toLocaleDateString('id-ID'),
      isRead: false
    };

    const currentData = storage.getData();
    currentData.messages.push(newMessage);
    storage.saveData(currentData);

    Swal.fire({
      title: 'Terkirim!',
      text: 'Pesan Anda telah kami terima.',
      icon: 'success',
      confirmButtonColor: '#d4af37'
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <span className="inline-block px-4 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-600 dark:text-gold-400 text-xs font-bold tracking-widest uppercase mb-6">
              Fullstack Developer & Designer
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 dark:text-white leading-tight mb-8">
              Hi, I'm <span className="text-gold-500">{data.profile.name.split(' ')[0]}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-lg mb-10 leading-relaxed">
              {data.profile.about}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#portfolio" className="bg-gray-900 text-white dark:bg-gold-500 dark:text-zinc-950 px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gold-600 transition-all shadow-lg">
                Lihat Karya
              </a>
              <a href="#contact" className="border-2 border-gray-900 text-gray-900 dark:border-zinc-700 dark:text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">
                Hubungi Saya
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gold-500/20 rounded-full blur-3xl"></div>
            <img 
              src={data.profile.photoUrl} 
              alt={data.profile.name}
              className="relative rounded-3xl w-full max-w-md mx-auto aspect-[4/5] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Mengenal Lebih Dekat</h2>
            <div className="w-20 h-1 bg-gold-500"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div className="space-y-6">
               <p className="text-gray-600 dark:text-zinc-400 text-lg leading-relaxed">
                 Halo, saya {data.profile.name}. Seorang profesional di bidang teknologi yang menggabungkan estetika desain dengan efisiensi kode.
               </p>
               <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <h4 className="text-gold-600 font-bold text-2xl">5+</h4>
                    <p className="text-xs uppercase tracking-widest font-semibold opacity-70">Tahun Pengalaman</p>
                  </div>
                  <div>
                    <h4 className="text-gold-600 font-bold text-2xl">50+</h4>
                    <p className="text-xs uppercase tracking-widest font-semibold opacity-70">Proyek Selesai</p>
                  </div>
               </div>
             </div>
             <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-700">
                <h3 className="text-xl font-bold mb-6">Informasi Kontak</h3>
                <ul className="space-y-4">
                   <li className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gold-50 dark:bg-zinc-700 flex items-center justify-center rounded-lg text-gold-500">
                        <i className="fa-solid fa-envelope"></i>
                      </div>
                      <span>{data.profile.email}</span>
                   </li>
                   <li className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gold-50 dark:bg-zinc-700 flex items-center justify-center rounded-lg text-gold-500">
                        <i className="fa-solid fa-phone"></i>
                      </div>
                      <span>{data.profile.phone}</span>
                   </li>
                   <li className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gold-50 dark:bg-zinc-700 flex items-center justify-center rounded-lg text-gold-500">
                        <i className="fa-solid fa-location-dot"></i>
                      </div>
                      <span>{data.profile.location}</span>
                   </li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Kemampuan Teknis</h2>
            <div className="w-20 h-1 bg-gold-500"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {data.skills.map((skill) => (
              <div key={skill.id} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold uppercase tracking-widest text-sm">{skill.name}</span>
                  <span className="text-gold-600 font-bold">{skill.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold-500 transition-all duration-1000"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-gray-50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Karya Pilihan</h2>
            <div className="w-20 h-1 bg-gold-500"></div>
          </div>

          {/* Filters */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${activeCategory === 'all' ? 'bg-gold-500 text-zinc-950' : 'bg-white dark:bg-zinc-800 text-gray-500'}`}
            >
              Semua
            </button>
            {data.categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-gold-500 text-zinc-950' : 'bg-white dark:bg-zinc-800 text-gray-500'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((p) => (
              <div key={p.id} className="group relative bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-lg transition-all hover:-translate-y-2">
                <div className="aspect-video overflow-hidden">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <span className="text-xs text-gold-600 font-bold uppercase tracking-widest mb-2 block">
                    {data.categories.find(c => c.id === p.categoryId)?.name}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 mb-4">{p.description}</p>
                  <a href={p.link || '#'} className="text-zinc-950 dark:text-white font-bold text-xs uppercase tracking-widest border-b-2 border-gold-500 pb-1 inline-block hover:border-zinc-950 dark:hover:border-white transition-all">
                    Detail Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Apa Kata Mereka</h2>
            <div className="w-20 h-1 bg-gold-500"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {data.testimonials.map((t) => (
              <div key={t.id} className="bg-gray-50 dark:bg-zinc-800 p-8 rounded-3xl relative">
                <i className="fa-solid fa-quote-right absolute top-8 right-8 text-4xl text-gold-500/20"></i>
                <p className="text-gray-600 dark:text-zinc-300 italic mb-8 leading-relaxed">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                    <p className="text-xs text-gold-600 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-900 text-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-8">Mari Mulai Bekerja Sama</h2>
              <p className="text-zinc-400 mb-12 text-lg">
                Punya ide menarik? Mari kita diskusikan bagaimana saya bisa membantu mewujudkannya.
              </p>
              
              <div className="space-y-6">
                 {data.socials.map(s => (
                   <a key={s.id} href={s.url} target="_blank" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-zinc-950 transition-all">
                        <i className={s.icon}></i>
                      </div>
                      <span className="font-bold tracking-widest uppercase text-sm group-hover:text-gold-500 transition-colors">{s.platform}</span>
                   </a>
                 ))}
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="bg-zinc-800/50 p-8 md:p-12 rounded-3xl border border-zinc-700">
               <div className="grid md:grid-cols-2 gap-6 mb-6">
                 <div>
                   <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Nama Lengkap</label>
                   <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 transition-all" 
                    placeholder="John Doe"
                    required
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Email</label>
                   <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 transition-all" 
                    placeholder="john@example.com"
                    required
                   />
                 </div>
               </div>
               <div className="mb-6">
                 <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Subjek</label>
                 <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 transition-all" 
                  placeholder="Inquiry Project"
                 />
               </div>
               <div className="mb-8">
                 <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Pesan</label>
                 <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 transition-all" 
                  placeholder="Tuliskan pesan Anda..."
                  required
                 ></textarea>
               </div>
               <button type="submit" className="w-full bg-gold-500 text-zinc-950 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-600 transition-all shadow-xl shadow-gold-500/10">
                 Kirim Pesan
               </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PublicHome;
