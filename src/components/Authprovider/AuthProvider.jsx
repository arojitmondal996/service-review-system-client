import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../firebase/firebase.config";
import axios from "axios";
// import "react-loading-skeleton/dist/skeleton.css";

export const authContext = createContext();

const AuthProvider = ({ routes }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const handleRegister = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const handleLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const handleGoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const manageProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    const handleLogout = () => {
        return signOut(auth);
    };

    const authInfo = {
        handleRegister,
        handleLogin,
        handleGoogleLogin,
        user,
        setUser,
        handleLogout,
        loading,
        manageProfile,
    };

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    //         if (currentUser?.email) {
    //             setUser(currentUser);
    //             const { data } = await axios.post(
    //                 `http://localhost:3000/jwt`,
    //                 { email: currentUser?.email },
    //                 { withCredentials: true }
    //             );
    //             console.log(data);
    //         } else {
    //             setUser(currentUser);
    //             await axios.get(`http://localhost:3000/logout`, {
    //                 withCredentials: true,
    //             });
    //         }
    //         setLoading(false);
    //     });
    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            console.log('CurrentUser-->', currentUser)
            if (currentUser?.email) {
                setUser(currentUser)
                // 13 13 13 13 13 server theke data ta ekane load koric jwt er
                const { data } = await axios.post(`http://localhost:3000/jwt`, { email: currentUser?.email },
                    { withCredentials: true }
                )
                console.log(data)
            } else {
                setUser(currentUser)
                const { data } = await axios.get(`http://localhost:3000/logout`,
                    { withCredentials: true }
                )
            }
            setLoading(false)
        })
        return () => {
            unsubscribe();
        };
    }, []);





    return (
        <div>
            <authContext.Provider value={authInfo}>
                {routes}
            </authContext.Provider>
        </div>
    );
};

export default AuthProvider;
