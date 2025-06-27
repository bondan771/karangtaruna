import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onIdTokenChanged
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, userRole = "anggota") {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Buat dokumen user di Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: userRole,
        createdAt: new Date()
      });
      
      return user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(true);
        
        // Setup realtime listener untuk user document
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeUser = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setRole(userData.role || "anggota");
            
            // Update currentUser dengan role terbaru
            setCurrentUser(prev => ({
              ...prev,
              role: userData.role
            }));
          } else {
            setRole("anggota");
          }
          setLoading(false);
        });
        
        return unsubscribeUser;
      } else {
        setCurrentUser(null);
        setRole(null);
        setLoading(false);
      }
    });

    return unsubscribeAuth;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    role,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}