import { createContext, useContext, useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { toast } from "react-toastify";

const AuthContext = createContext();
export const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, [auth]);

  const SignInUser = async (email, password, displayName) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName: displayName,
      });
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("login Successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  const signOut = async () => {
    await auth.signOut();
    toast.success("logOut Successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        SignInUser,
        currentUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
