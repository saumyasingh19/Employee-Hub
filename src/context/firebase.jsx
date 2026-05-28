import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where
} from "firebase/firestore";
import { createContext, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDiaRd6tXL-sbEUOkZHKcc7fbE_WylEvDY",
  authDomain: "employee-94f1d.firebaseapp.com",
  projectId: "employee-94f1d",
  storageBucket: "employee-94f1d.firebasestorage.app",
  messagingSenderId: "237423846118",
  appId: "1:237423846118:web:7be9797024e6b64689d127",
  measurementId: "G-DK4GTRQYH1",
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseapp);
export const auth = getAuth(firebaseapp);

export const useFirebase = () => useContext(FirebaseContext);

// SIGNUP FUNCTION
const signup = async (email, password, fullName, role, contact) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(firestore, "employee", user.uid), {
    fullName,
    email,
    role,
    contact,
  });

  return user;
};

// SIGNUP WITH GOOGLE
export const signupWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(firestore, "employee", user.uid), {
      fullName: user.displayName,
      email: user.email,
      role: "employee",
      contact: "",
    });

    return user;
  } catch (error) {
    alert("Google Sign-In Error: ", error);
    throw error;
  }
};

// LOGIN FUNCTION
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    alert("Error logging in: " + error.message);
    throw error;
  }
};

// SAVE TASK FUNCTION
export const SavedTask = async (Task, description, deadline, assign, catagory) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  await addDoc(collection(firestore, "Tasks"), {
    Task,
    description,
    deadline,
    assign,
    catagory,
    userId: user.uid,
    userEmail: user.email,
    status: "new", // default status
    createdAt: new Date(),
  });
};

// GET TASKS (filtered by current user)
export const getTasks = async (userEmail = null, showCompleted = false) => {
  const tasksRef = collection(firestore, "Tasks");
  let q;

  if (userEmail) {
    q = query(tasksRef, where("userEmail", "==", userEmail));
  } else {
    q = tasksRef;
  }

  const snapshot = await getDocs(q);
  const allTasks = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Filter in JS instead of Firestore query
  return showCompleted
    ? allTasks
    : allTasks.filter((task) => task.status !== "completed");
};


// DELETE TASK
export const deleteTask = async (taskId) => {
  await deleteDoc(doc(firestore, "Tasks", taskId));
};

// MARK TASK COMPLETED
export const markTaskCompleted = async (taskId) => {
  await updateDoc(doc(firestore, "Tasks", taskId), {
    status: "completed",
    completedAt: new Date() // Add completion timestamp
  });
};

// Context Provider
export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider
      value={{
        signup,
        login,
        signupWithGoogle,
        SavedTask,
        getTasks,
        deleteTask,
        markTaskCompleted,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};