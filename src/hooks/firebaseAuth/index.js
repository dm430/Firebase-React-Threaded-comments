import React, { useContext, useEffect, useState } from 'react';

import * as firebase from 'firebase';
import 'firebase/auth';

const AuthContext = React.createContext(null);

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const user = firebase.auth().currentUser;

        return user;
    });

    useEffect(() => {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            setUser(firebaseUser);
        });
    }, [])

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

const useAuth = () => {
    const user = useContext(AuthContext);

    return user;
};

const signInWithPopup = (provider) => {
    return firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
    return firebase.auth().signOut();
};

const AuthProviders = {
    Google: new firebase.auth.GoogleAuthProvider()
};

export { useAuth, signInWithPopup, signOut, AuthContextProvider, AuthProviders }