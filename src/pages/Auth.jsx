import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Auth() {
  const { login, register } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  
  // State untuk form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Suami');
  const [workspaceId, setWorkspaceId] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name, role, workspaceId);
      }
    } catch (err) {
      // Mengubah pesan error Firebase menjadi lebih ramah dibaca
      if (err.code === 'auth/invalid-credential') setError('Email atau password salah.');
      else if (err.code === 'auth/email-already-in-use') setError('Email sudah terdaftar.');
      else setError(err.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-6 font-sans">
      <div className="w-full max-w-sm bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50">
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 font-black text-2xl shadow-sm">
            FH
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
          {isLogin ? 'Selamat Datang' : 'Buat Akun'}
        </h2>
        <p className="text-center text-slate-500 mb-8 text-sm">
          {isLogin ? 'Masuk ke Ruang Keluarga Anda' : 'Mulai atur keuangan keluarga bersama'}
        </p>

        {error && (
          <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl mb-6 text-sm font-medium border border-rose-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="animate-in fade-in flex flex-col gap-4">
              <input type="text" placeholder="Nama Panggilan" className="p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-slate-400" value={name} onChange={e => setName(e.target.value)} required />
              
              <select className="p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all text-slate-700" value={role} onChange={e => setRole(e.target.value)}>
                <option value="Suami">Suami</option>
                <option value="Istri">Istri</option>
              </select>
              
              <div className="relative">
                <input type="text" placeholder="ID Keluarga (mis. salman_jannah)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-slate-400" value={workspaceId} onChange={e => setWorkspaceId(e.target.value)} required />
                <p className="text-[11px] text-slate-400 mt-2 ml-2 leading-relaxed">
                  *Pastikan kamu dan pasangan memasukkan ID Keluarga yang <b>sama persis</b> agar data terhubung.
                </p>
              </div>
            </div>
          )}
          
          <input type="email" placeholder="Email" className="p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-slate-400" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password (min. 6 karakter)" className="p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-slate-400" value={password} onChange={e => setPassword(e.target.value)} required />

          <button type="submit" disabled={loading} className="mt-4 bg-amber-500 text-white font-bold p-4 rounded-2xl shadow-lg shadow-amber-200 hover:bg-amber-600 active:scale-95 transition-all flex justify-center">
            {loading ? 'Memproses...' : (isLogin ? 'Masuk' : 'Daftar')}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 text-sm">
          {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
          <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-amber-600 font-bold hover:text-amber-700 transition-colors">
            {isLogin ? 'Daftar di sini' : 'Masuk'}
          </button>
        </p>
      </div>
    </div>
  );
}