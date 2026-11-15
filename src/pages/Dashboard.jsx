import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  Wallet, CalendarDays, Wrench, Heart, 
  BookOpen, LineChart, HelpCircle, Sparkles, 
  CheckCircle2, Clock 
} from 'lucide-react';

export default function Dashboard() {
  const { userData } = useContext(AuthContext);

  const shortcuts = [
    { name: 'Keuangan', icon: <Wallet size={24} />, color: 'bg-amber-500' },
    { name: 'Kalender', icon: <CalendarDays size={24} />, color: 'bg-sky-600' },
    { name: 'Maintenance', icon: <Wrench size={24} />, color: 'bg-orange-400' },
    { name: 'Conversation', icon: <Heart size={24} />, color: 'bg-rose-400' },
    { name: 'Jurnal Keluarga', icon: <BookOpen size={24} />, color: 'bg-rose-500' },
    { name: 'Laporan', icon: <LineChart size={24} />, color: 'bg-indigo-500' },
    { name: 'Bantuan & FAQ', icon: <HelpCircle size={24} />, color: 'bg-teal-600' },
    { name: 'Lainnya', icon: <Sparkles size={24} />, color: 'bg-emerald-500' },
  ];

  return (
    <div className="p-4 pt-8 animate-in fade-in pb-24 max-w-md mx-auto">
      
      {/* 1. Widget Cuaca & Waktu */}
      <div className="bg-gradient-to-br from-stone-400 to-stone-300 rounded-[2rem] p-6 text-white mb-6 shadow-sm">
         <div className="flex justify-between items-start mb-6">
            <div>
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center font-bold text-xs">FH</div>
                 <h1 className="text-xl font-bold tracking-wide">Family Hub</h1>
               </div>
               <p className="mt-1 opacity-90 text-sm">Selamat siang, Keluarga {userData?.name || 'Demo'}</p>
            </div>
            <div className="text-right">
               <p className="font-bold text-xl">12:21</p>
               <p className="text-xs opacity-90">Minggu, 15 Nov</p>
            </div>
         </div>
         <div className="flex justify-between text-center text-xs opacity-90">
            <div><p className="mb-1">Pagi</p><p className="font-bold text-base">25°</p></div>
            <div><p className="mb-1">Siang</p><p className="font-bold text-base">29°</p></div>
            <div><p className="mb-1">Sore</p><p className="font-bold text-base">27°</p></div>
            <div><p className="mb-1">Malam</p><p className="font-bold text-base">26°</p></div>
         </div>
      </div>

      {/* 2. Grid Shortcuts */}
      <div className="grid grid-cols-4 gap-y-6 gap-x-2 mb-8">
        {shortcuts.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform">
            <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-bold text-slate-600 text-center leading-tight px-1">
              {item.name === 'Conversation' ? 'Conversation Cards' : item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Banner Tips */}
      <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-6 flex gap-4">
        <Sparkles className="text-amber-500 shrink-0" size={24} />
        <div>
          <h4 className="font-bold text-slate-800 text-sm mb-1">Baru: pilih fitur yang kamu pakai</h4>
          <p className="text-xs text-slate-500 mb-3 leading-relaxed">Sembunyikan fitur yang tidak kamu pakai dan atur sendiri ikon Beranda.</p>
          <div className="flex gap-3">
            <button className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl">Atur sekarang</button>
            <button className="text-amber-700 text-xs font-bold px-2 py-2">Nanti saja</button>
          </div>
        </div>
      </div>

      {/* 3. Agenda Hari Ini */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-slate-800 text-lg">Agenda Hari ini</h3>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full">0/1 selesai</span>
            <button className="bg-amber-100 text-amber-700 p-1 rounded-full"><Plus size={16} /></button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
           <div className="flex items-center gap-3">
             <div className="w-5 h-5 rounded border-2 border-slate-300"></div>
             <span className="font-bold text-slate-700 text-sm">Ganti oli mobil</span>
           </div>
           <span className="text-[10px] text-slate-400 font-medium">Jadwal Maintenance</span>
        </div>
      </div>

      {/* 4. Akan Jatuh Tempo */}
      <div className="mb-8">
        <h3 className="font-bold text-slate-800 text-lg mb-3">Akan jatuh tempo</h3>
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 flex flex-col gap-1">
          
          <div className="flex justify-between items-center p-3 rounded-2xl hover:bg-slate-50">
             <div className="flex gap-3 items-center">
               <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600"><CheckCircle2 size={20} /></div>
               <div>
                 <h4 className="font-bold text-slate-800 text-sm">Bayar listrik</h4>
                 <p className="text-[10px] text-slate-500">Tugas · Jadwal Bayar & Belanja</p>
               </div>
             </div>
             <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-3 py-1 rounded-full">2 hari lagi</span>
          </div>

          <div className="flex justify-between items-center p-3 rounded-2xl hover:bg-slate-50">
             <div className="flex gap-3 items-center">
               <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600"><Wrench size={20} /></div>
               <div>
                 <h4 className="font-bold text-slate-800 text-sm">Servis Mobil Keluarga</h4>
                 <p className="text-[10px] text-slate-500">Maintenance Kendaraan</p>
               </div>
             </div>
             <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full">18 hari lagi</span>
          </div>

          <button className="w-full py-3 text-xs font-bold text-slate-600 mt-1">Lihat lebih lengkap (6) ›</button>
        </div>
      </div>

      {/* 5. Toggle Tab Ringkasan */}
      <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
        <button className="flex-1 bg-white text-slate-800 text-xs font-bold py-2.5 rounded-xl shadow-sm">Ringkasan Keuangan</button>
        <button className="flex-1 text-slate-500 text-xs font-bold py-2.5 rounded-xl">Agenda Minggu ini</button>
      </div>

      {/* 6. Kekayaan Bersih & Saldo (Dari Fase Sebelumnya) */}
      <div className="bg-[#2D4A3E] rounded-3xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
        <div className="absolute top-4 right-4 text-emerald-300/50"><Clock size={20} /></div>
        <p className="text-emerald-100/80 text-xs mb-1 font-medium">Kekayaan Bersih Keluarga</p>
        <h2 className="text-3xl font-black mb-3">Rp 0</h2>
        <p className="text-[10px] text-emerald-200/60 mb-4">Harta Rp 0 - Utang Rp 0</p>
        <button className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-xl text-xs font-bold transition-colors">
          Lihat rincian →
        </button>
      </div>

      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-2">
           <div>
             <h3 className="font-bold text-slate-800 text-sm">Saldo Aktif</h3>
             <h2 className="text-2xl font-black text-slate-800 mt-1">Rp 0</h2>
           </div>
           <Clock size={20} className="text-slate-400" />
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed max-w-[80%]">
          Akumulasi dari awal, gak reset tiap bulan • di luar dana Tabungan/Goal
        </p>
      </div>

    </div>
  );
}
// Note: Icon 'Plus' belum diimport di atas, kita tambahkan:
import { Plus } from 'lucide-react';