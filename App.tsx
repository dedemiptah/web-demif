
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

// Pages
import PublicHome from './pages/PublicHome';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPortfolio from './pages/admin/ManagePortfolio';
import AdminSkills from './pages/admin/ManageSkills';
import AdminTestimonials from './pages/admin/ManageTestimonials';
import AdminSocials from './pages/admin/ManageSocials';
import AdminMessages from './pages/admin/ManageMessages';
import AdminProfile from './pages/admin/ManageProfile';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminSidebar from './components/AdminSidebar';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <HashRouter>
      <div className="min-h-screen transition-colors duration-300">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <PublicHome />
              <Footer />
              <FloatingWhatsApp />
            </>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <AdminLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="profile" element={<AdminProfile />} />
                  <Route path="portfolio" element={<AdminPortfolio />} />
                  <Route path="skills" element={<AdminSkills />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="socials" element={<AdminSocials />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </HashRouter>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('admin_session') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

const AdminLayout: React.FC<{ children: React.ReactNode, darkMode: boolean, toggleDarkMode: () => void }> = ({ children, darkMode, toggleDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-900">
      <AdminSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 flex items-center justify-between px-6">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-gray-700 dark:text-zinc-400">
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
          <div className="flex items-center gap-4">
             <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700">
              {darkMode ? <i className="fa-solid fa-sun text-yellow-500"></i> : <i className="fa-solid fa-moon text-blue-500"></i>}
            </button>
            <button 
              onClick={() => {
                Swal.fire({
                  title: 'Logout?',
                  text: 'Anda akan keluar dari panel admin.',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d4af37',
                  confirmButtonText: 'Ya, Logout!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.removeItem('admin_session');
                    window.location.href = '#/admin/login';
                  }
                });
              }}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

const FloatingWhatsApp = () => {
  return (
    <a 
      href="https://wa.me/6281234567890" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl animate-pulse-gold hover:scale-110 transition-transform"
    >
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  );
}

export default App;
