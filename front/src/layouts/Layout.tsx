import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import logo from '@/assets/logo.svg';

export default function Layout() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // animación de entrada al montar
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="BlockchainEdu Logo" 
              className="w-10 h-10 transform transition-transform duration-700 hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                BlockchainEdu
              </span>
              <small className="text-xs text-gray-500">Aprende el futuro</small>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-6">
            <NavLink to="/" className={({ isActive }) => `transition-colors font-medium ${isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}>
              Cursos
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => `transition-colors font-medium ${isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}>
              Favoritos
            </NavLink>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Abrir menú"
            className="sm:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(v => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="sm:hidden border-t border-gray-100 bg-white/95">
            <div className="px-4 py-3 flex flex-col gap-2">
              <NavLink onClick={() => setOpen(false)} to="/" className={({ isActive }) => `p-2 rounded-md font-medium ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                Cursos
              </NavLink>
              <NavLink onClick={() => setOpen(false)} to="/favorites" className={({ isActive }) => `p-2 rounded-md font-medium ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                Favoritos
              </NavLink>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 py-10">
        <div className={`max-w-6xl mx-auto px-4 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <Outlet />
          </div>
        </div>
      </main>
        
      <footer className="bg-gray-800 text-gray-200 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="BlockchainEdu" className="w-8 h-8" />
              <h3 className="text-lg font-semibold">BlockchainEdu</h3>
            </div>
            <p className="text-sm text-gray-400">
              Plataforma educativa especializada en blockchain, criptomonedas y tecnologías Web3. 
              Aprende las tecnologías del futuro con cursos de calidad profesional.
            </p>
          </div>

          <div className="flex flex-col text-sm text-gray-300">
            <span className="font-medium mb-3">Navegación</span>
            <NavLink to="/" className="hover:text-white mb-1 transition-colors">Cursos</NavLink>
            <NavLink to="/favorites" className="hover:text-white mb-1 transition-colors">Favoritos</NavLink>
          </div>

          <div className="text-sm text-gray-400">
            <span className="font-medium mb-3 block">Tecnologías</span>
            <div className="space-y-1">
              <div>React 18 + TypeScript</div>
              <div>Vite + TailwindCSS</div>
              <div>React Router + Axios</div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              © {new Date().getFullYear()} BlockchainEdu
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
