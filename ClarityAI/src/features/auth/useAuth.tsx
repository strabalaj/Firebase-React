/*
Auth Context with useAuth Hook
In React apps, many components need to know if the user is logged in, 
who the user is, or perform login/logout actions.
    - Instead of passing this info down through props repeatedly,
    - We create a Context to store the current user and auth methods,
    - And a custom hook (useAuth) to easily access the context anywhere.
This way, any component can get auth state without prop drilling.


Context holding user info & auth methods.
Provider component to manage Firebase Auth state.
Custom hook to access the context.
*/

//import React and Firebase Auth
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    getAuth,
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    type UserCredential,
} from 'firebase/auth';
import { auth } from '../../lib/firebase'; 

/* Defire the shape of context data
We want to store:
    - currentUser: The logged-in Firebase User object or null
    - Auth functions like login, signup, logout
    - Maybe loading state while checking auth
*/
interface AuthContextType {
    currentUser: User | null;
    login: (email: string, password: string) => Promise<UserCredential>;
    signup: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create AuthProvider component
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Clean up subscription on unmount
    return unsubscribe;
  }, []);

  // Auth functions
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render children until loading completes */}
      {!loading && children}
    </AuthContext.Provider>
  );
};


// Custom hook to use Auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }
  