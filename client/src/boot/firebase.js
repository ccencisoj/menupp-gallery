import { initializeApp } from "firebase/app";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  connectAuthEmulator,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoQUagV8QDrY0eoORFy0QGlBEOP2RU0Zc",
  authDomain: "project-1-74491.firebaseapp.com",
  projectId: "project-1-74491",
  storageBucket: "project-1-74491.appspot.com",
  messagingSenderId: "61492641630",
  appId: "1:61492641630:web:8c6f4828231b4b606d59cf",
  measurementId: "G-LKRQDSK0S4",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

export { app, storage, auth, providers };
