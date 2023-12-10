import { FIREBASE_DB } from "./FirebaseConfig";
import { ref, set, onValue } from "firebase/database";

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

export { writeUserData, readUserData };
