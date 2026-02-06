import React, { useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  //   console.log(loading, user);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };
  
  const updateUser = (updatedData) => {
    // console.log(updatedData);
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOut = () => {
    return signOut(auth);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
   
    return () => {
      unsubscribe();
    };
  }, []);

  // user data Load Mongodb
  useEffect(()=>{
    if(!user)
        return;
    axios.get(`http://localhost:3000/users/role/${user.email}`)
    .then(res => {
        // console.log(res.data.role);
       setRole(res.data.role);
    })
  },[user])
  console.log('user role', role);
  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    loading,
    setLoading,
    updateUser,
    googleSignIn,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
