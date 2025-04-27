import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export function useTasks(user) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [user]);

  return { tasks, setTasks };
}