// Uppdaterad config.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
import { browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsx4WROBBfjFdtagrbrvKHiSKZvpjmxh8",
  authDomain: "testyourapp-89234.firebaseapp.com",
  projectId: "testyourapp-89234",
  storageBucket: "testyourapp-89234.appspot.com",
  messagingSenderId: "611224092790",
  appId: "1:611224092790:web:c413434cfa708250cedf57",
  measurementId: "G-M3YPLG53PS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Använd standardpersistencealternativet för webbläsaren
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});

export { app, db, auth };
