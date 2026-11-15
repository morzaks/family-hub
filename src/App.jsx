import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, WalletCards, CalendarDays, Heart, Grid } from 'lucide-react';

// Placeholder untuk halaman-halaman utama
const Dashboard = () => <div className="p-6 pt-20 animate-in fade-in"><h1 className="text-2xl font-bold text-gray-800">Beranda</h1><p className="text-gray-500 mt-2">Selamat datang di Family Hub.</p></div>;
const Keuangan = () => <div className="p-6 pt-20 animate-in fade-in"><h1 className="text-2xl font-bold text-gray-800">Keuangan</h1></div>;
const Kalender = () => <div className="p-6 pt-20 animate-in fade-in"><h1 className="text-2xl font-bold text-gray-800">Kalender</h1></div>;
const Berdua = () => <div className="p-6 pt-20 animate-in fade-in"><h1 className="text-2xl font-bold text-gray-800">Berdua</h1></div>;
const Lainnya = () => <div className="p-6 pt-20 animate-in fade-in"><h1 className="text-2xl font-bold text-gray-800">Lainnya</h1></div>;

function BottomNavigation() {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Beranda', icon: <Home size={24} /> },
    { path: '/keuangan', label: 'Keuangan', icon: <WalletCards size={24} /> },
    { path: '/kalender', label: 'Kalender', icon: <CalendarDays size={24} /> },
    { path: '/berdua', label: 'Berdua', icon: <Heart size={24} /> },
    { path: '/lainnya', label: 'Lainnya', icon: <Grid size={24} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-2 py-2 pb-safe z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${isActive ? 'text-amber-600' : 'text-gray-400 hover:text-gray-600'}`}>
              <div className={`mb-1 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex justify-center font-sans text-gray-900">
        {/* Kontainer Layar Mobile */}
        <div className="w-full max-w-md bg-gray-50 min-h-screen relative pb-24 shadow-2xl overflow-x-hidden">
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/keuangan" element={<Keuangan />} />
            <Route path="/kalender" element={<Kalender />} />
            <Route path="/berdua" element={<Berdua />} />
            <Route path="/lainnya" element={<Lainnya />} />
          </Routes>

          <BottomNavigation />
        </div>
      </div>
    </Router>
  );
}