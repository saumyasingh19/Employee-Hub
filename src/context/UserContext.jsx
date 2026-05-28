import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../firebase"; 
import { auth } from "./firebase";
import { firestore } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name: "", role: "" }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const uid = firebaseUser.uid;

        // Fetch profile from Firestore
        const docRef = doc(firestore, "employee", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser({
            name: data.fullName,
            role: data.role,
            email: data.email,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // clean up
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);