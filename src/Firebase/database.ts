import { FIREBASE_DB, FIREBASE_APP } from "./FirebaseConfig";
import { ref, set, onValue } from "firebase/database";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const userRef = ref(FIREBASE_DB, "users/usuario23");

const writeUserData = (data: any) => {
    return set(userRef, data);
};

const readUserData = () => {
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    console.log('====================')
    console.log('DATA en RDB')
    console.log(data);
  });
};

const db = getFirestore(FIREBASE_APP);

const createReport = async (name: string, photo: string, description: string, date: Date) => {
  try {
    const docRef = await addDoc(collection(db, "reports"), {
      name,
      photo,
      description,
      location,
      date,
      checked
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { writeUserData, readUserData, createReport };