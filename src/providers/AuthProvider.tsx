import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import auth from "../firebase.config";
const googleProvider = new GoogleAuthProvider();

interface ContextProps {
  user: User | null;
  loading: boolean;
  googleLogin: () => Promise<UserCredential>;
  emailSignUp: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  //   emailLogin: unknown;
}

export const AuthContext = createContext<ContextProps | null>(null);

const AuthProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoading(false);
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const emailSignUp = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const data = { user, loading, googleLogin, emailSignUp, logOut };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProviderWrapper;
