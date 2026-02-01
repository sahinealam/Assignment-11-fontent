import React, { useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { AuthContext } from '../context/AuthContext';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()

    // console.log(loading, user);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }



    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }


    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }


    const updateUser = (updatedData) => {
        // console.log(updatedData);
        return updateProfile(auth.currentUser, updatedData)
    }
    


    const logOut = () => {
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    }, [])

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

    }
    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;