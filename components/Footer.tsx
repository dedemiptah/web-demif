
import React from 'react';
import { storage } from '../services/storage';

const Footer: React.FC = () => {
  const { socials, profile } = storage.getData();

  return (
    <footer className="bg-zinc-900 text-zinc-400 py-16 dark:bg-black dark:border-t dark:border-zinc-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-12">
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-6">
              DEDE<span className="text-gold-500">.</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Membangun masa depan digital melalui kode berkualitas dan desain yang berpusat pada pengguna.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigasi</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#home" className="hover:text-gold-500 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-gold-500 transition-colors">About</a></li>
              <li><a href="#portfolio" className="hover:text-gold-500 transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-gold-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Ikuti Saya</h4>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a 
                  key={social.id} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-gold-500 hover:text-zinc-950 hover:border-gold-500 transition-all"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
            <div className="mt-8 text-sm">
              <p><i className="fa-solid fa-envelope mr-2 text-gold-500"></i> {profile.email}</p>
              <p className="mt-2"><i className="fa-solid fa-location-dot mr-2 text-gold-500"></i> {profile.location}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
          <p>© 2024 Dede Miptah Parid Awaludin. All Rights Reserved.</p>
          <p>Created with <i className="fa-solid fa-heart text-red-500"></i> for Digital Excellence</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
