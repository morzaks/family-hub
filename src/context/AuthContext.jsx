import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // Menyimpan workspaceId dan role
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener ini akan terus memantau apakah ada user yang sedang login
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Jika login berhasil, tarik data keluarga dari database
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Fungsi Register sekaligus mendaftarkan ID Keluarga di database
  const register = async (email, password, name, role, workspaceId) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Simpan profil user & ID Keluarga ke Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      role, // 'Suami' atau 'Istri'
      workspaceId // Kode unik keluarga (misal: 'keluarga_salman_jannah')
    });
    return user;
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, userData, register, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}