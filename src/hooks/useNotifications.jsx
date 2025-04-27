import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export function useNotifications(user) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    const q = query(collection(db, "notifications"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(notificationsData);
    });

    return () => unsubscribe();
  }, [user]);

  return { notifications };
}