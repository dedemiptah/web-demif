
import { AppData } from './types';

// Password hash for 'admin123' using SHA-256
const DEFAULT_ADMIN_HASH = '240be518fabd2724ddb6f0403f35935030c5c6095484c6a47195d9e051c78912';

export const INITIAL_DATA: AppData = {
  admin: {
    username: 'admin',
    passwordHash: DEFAULT_ADMIN_HASH,
    lastLogin: '-'
  },
  profile: {
    id: '1',
    name: 'Dede Miptah Parid Awaludin',
    title: 'Senior Fullstack Developer & UI/UX Designer',
    about: 'Lulusan terbaik dengan dedikasi tinggi pada pengembangan solusi perangkat lunak yang elegan dan performan. Memiliki pengalaman dalam membangun ekosistem digital modern yang berfokus pada pengalaman pengguna.',
    email: 'dede.miptah@example.com',
    phone: '+6281234567890',
    location: 'Bandung, Indonesia',
    photoUrl: 'https://picsum.photos/seed/dede/600/800'
  },
  skills: [
    { id: '1', name: 'React / Next.js', percentage: 95, category: 'Frontend' },
    { id: '2', name: 'PHP / Laravel', percentage: 88, category: 'Backend' },
    { id: '3', name: 'UI/UX Design', percentage: 90, category: 'Design' }
  ],
  categories: [
    { id: '1', name: 'Web Development' },
    { id: '2', name: 'Mobile App' },
    { id: '3', name: 'UI Design' }
  ],
  portfolio: [
    { id: '1', title: 'E-Commerce Premium', description: 'Platform belanja eksklusif.', imageUrl: 'https://picsum.photos/seed/p1/800/600', categoryId: '1' }
  ],
  testimonials: [
    { id: '1', name: 'Budi Santoso', role: 'CEO of TechCorp', content: 'Dede adalah developer yang sangat teliti.', avatarUrl: 'https://picsum.photos/seed/t1/100/100' }
  ],
  messages: [],
  socials: [
    { id: '1', platform: 'Instagram', url: 'https://instagram.com/dede', icon: 'fa-brands fa-instagram' },
    { id: '2', platform: 'WhatsApp', url: 'https://wa.me/6281234567890', icon: 'fa-brands fa-whatsapp' }
  ],
  logs: [
    { id: '1', action: 'Sistem Diinisialisasi', timestamp: new Date().toLocaleString(), status: 'success' }
  ]
};

export const SQL_SCHEMA = `
-- DATABASE SCHEMA FOR DEDE PORTFOLIO
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    last_login DATETIME
);

CREATE TABLE profil (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    title VARCHAR(100),
    about TEXT,
    email VARCHAR(100),
    phone VARCHAR(20),
    location VARCHAR(255),
    photo_url VARCHAR(255)
);

CREATE TABLE kategori (
    id_kategori INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE portfolio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_kategori INT,
    title VARCHAR(100),
    description TEXT,
    image_url VARCHAR(255),
    link VARCHAR(255),
    FOREIGN KEY (id_kategori) REFERENCES kategori(id_kategori)
);

CREATE TABLE skill (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    percentage INT,
    category VARCHAR(50)
);

CREATE TABLE testimoni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    role VARCHAR(100),
    content TEXT,
    avatar_url VARCHAR(255)
);

CREATE TABLE pesan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    subject VARCHAR(255),
    message TEXT,
    date DATETIME,
    is_read BOOLEAN DEFAULT FALSE
);

CREATE TABLE media_sosial (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(50),
    url VARCHAR(255),
    icon VARCHAR(50)
);
`;
