import { FIREBASE_DB, FIREBASE_APP } from "./FirebaseConfig";
import { ref, set, onValue } from "firebase/database";
import { getFirestore, collection, addDoc, getDocs, DocumentData } from "firebase/firestore";

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

export const getReports = async (): Promise<ReportInterface[]> => {
  const reportCollectionRef = collection(db, "reports");
  const reportSnapshot = await getDocs(reportCollectionRef);
  const reportList = reportSnapshot.docs.map((doc): ReportInterface => {
    // Asume que doc.data() es de tipo DocumentData y lo asigna al tipo Report
    const data = doc.data() as DocumentData;
    return {
      id: doc.id,
      name: data.name,
      photo: data.photo,
      description: data.description,
      location: data.location,
      date: data.date.toDate(),
      checked: data.checked,
    };
  });
  return reportList;
};

const db = getFirestore(FIREBASE_APP);

const createReport = async (name: string, photo: string, description: string,location: string, date: Date,checked: boolean) => {
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