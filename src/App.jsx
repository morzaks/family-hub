import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, WalletCards, CalendarDays, Heart, Plus, X, ArrowDownToLine, ArrowUpToLine } from 'lucide-react';
import { Drawer } from 'vaul';
import { useState, useContext } from 'react'; // <-- Tambahkan useContext
import { AuthContext } from './context/AuthContext'; // <-- Import ini
import Auth from './pages/Auth'; // <-- Import ini

// Placeholder untuk halaman-halaman utama
const Dashboard = () => <div className="p-6 pt-12 animate-in fade-in"><h1 className="text-2xl font-bold text-slate-800">Beranda</h1><p className="text-slate-500 mt-2">Selamat datang di Family Hub.</p></div>;
const Keuangan = () => <div className="p-6 pt-12 animate-in fade-in"><h1 className="text-2xl font-bold text-slate-800">Keuangan</h1></div>;
const Kalender = () => <div className="p-6 pt-12 animate-in fade-in"><h1 className="text-2xl font-bold text-slate-800">Kalender</h1></div>;
const Berdua = () => <div className="p-6 pt-12 animate-in fade-in"><h1 className="text-2xl font-bold text-slate-800">Berdua</h1></div>;

function BottomNavigation() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 px-2 py-2 pb-safe z-40">
        <div className="flex justify-between items-center relative">
          
          <Link to="/" className={`flex flex-col items-center p-2 w-16 transition-all ${location.pathname === '/' ? 'text-amber-600' : 'text-slate-400'}`}>
            <Home size={24} className={location.pathname === '/' ? 'scale-110' : ''} />
            <span className="text-[10px] mt-1 font-medium">Beranda</span>
          </Link>
          
          <Link to="/keuangan" className={`flex flex-col items-center p-2 w-16 transition-all ${location.pathname === '/keuangan' ? 'text-amber-600' : 'text-slate-400'}`}>
            <WalletCards size={24} className={location.pathname === '/keuangan' ? 'scale-110' : ''} />
            <span className="text-[10px] mt-1 font-medium">Keuangan</span>
          </Link>

          {/* Tombol Floating Action (Tengah) */}
          <div className="relative -top-6 flex justify-center w-16">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white p-3.5 rounded-full shadow-lg shadow-amber-200 transform transition-transform active:scale-95 flex items-center justify-center"
            >
              <Plus size={26} strokeWidth={2.5} />
            </button>
          </div>

          <Link to="/kalender" className={`flex flex-col items-center p-2 w-16 transition-all ${location.pathname === '/kalender' ? 'text-amber-600' : 'text-slate-400'}`}>
            <CalendarDays size={24} className={location.pathname === '/kalender' ? 'scale-110' : ''} />
            <span className="text-[10px] mt-1 font-medium">Kalender</span>
          </Link>
          
          <Link to="/berdua" className={`flex flex-col items-center p-2 w-16 transition-all ${location.pathname === '/berdua' ? 'text-amber-600' : 'text-slate-400'}`}>
            <Heart size={24} className={location.pathname === '/berdua' ? 'scale-110' : ''} />
            <span className="text-[10px] mt-1 font-medium">Berdua</span>
          </Link>

        </div>
      </div>

      {/* Komponen Bottom Sheet (Native Feel) dari Vaul */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50 max-w-md mx-auto backdrop-blur-sm" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-3xl mt-24 fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 outline-none">
            <div className="p-5 bg-white rounded-t-3xl flex-1 pb-10">
              {/* Indikator geser (handle) */}
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-slate-200 mb-6" />
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-slate-800">Tambah Catatan</h3>
                <button onClick={() => setIsDrawerOpen(false)} className="p-1.5 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 active:scale-95 transition-all">
                  <X size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-rose-50 border border-rose-100 text-rose-600 p-5 rounded-2xl font-bold flex flex-col items-center gap-3 active:scale-95 transition-transform">
                   <div className="bg-white p-3 rounded-full shadow-sm"><ArrowUpToLine size={24} className="text-rose-500" /></div>
                   <span>Pengeluaran</span>
                </button>
                <button className="bg-emerald-50 border border-emerald-100 text-emerald-600 p-5 rounded-2xl font-bold flex flex-col items-center gap-3 active:scale-95 transition-transform">
                   <div className="bg-white p-3 rounded-full shadow-sm"><ArrowDownToLine size={24} className="text-emerald-500" /></div>
                   <span>Pemasukan</span>
                </button>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

export default function App() {
  const { currentUser, loading } = useContext(AuthContext);

  // Tampilkan layar putih kosong selama Firebase mengecek status login
  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Memuat...</div>;

  // Jika belum login, paksa ke halaman Auth
  if (!currentUser) return <Auth />;

  return (
    <Router>
      {/* vaul-drawer-wrapper diperlukan agar saat sheet naik, layar belakang memberikan efek scale-down khas iOS */}
      <div vaul-drawer-wrapper="" className="min-h-screen bg-black flex justify-center font-sans text-slate-900">
        <div className="w-full max-w-md bg-slate-50 min-h-screen relative pb-24 overflow-x-hidden transition-transform duration-300 bg-white">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/keuangan" element={<Keuangan />} />
            <Route path="/kalender" element={<Kalender />} />
            <Route path="/berdua" element={<Berdua />} />
          </Routes>
          <BottomNavigation />
        </div>
      </div>
    </Router>
  );
}