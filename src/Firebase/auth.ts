import { FIREBASE_AUTH } from "./FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const signIn = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            console.error(error);
            return undefined;
        });
};

const logIn = async (email: string, password: string) => {
    return signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        console.log("=========");
        console.log(userCredential.user);
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };
  
  export { signIn, logIn };