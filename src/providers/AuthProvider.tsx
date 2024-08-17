import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import auth from "../firebase.config";
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

interface ContextProps {
  user: User | null;
  loading: boolean;
  googleLogin: () => Promise<UserCredential>;
  githubLogin: () => Promise<UserCredential>;
  emailSignUp: (email: string, password: string) => Promise<UserCredential>;
  emailLogin: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<ContextProps | null>(null);

const AuthProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logOut = () => {
    // setLoading(true);
    return signOut(auth);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const emailSignUp = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const emailLogin = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const data = {
    user,
    loading,
    googleLogin,
    githubLogin,
    emailSignUp,
    emailLogin,
    logOut,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProviderWrapper;
