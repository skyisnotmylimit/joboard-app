import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOXZMT24YNnMtWRXBmXEwLFi_AOXJjtOw",
  authDomain: "jobportalproject-482f7.firebaseapp.com",
  projectId: "jobportalproject-482f7",
  storageBucket: "jobportalproject-482f7.appspot.com",
  messagingSenderId: "762502573562",
  appId: "1:762502573562:web:1402187713c187b8fd8843",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
