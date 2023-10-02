import { initializeApp } from "firebase/app";
import { testUser } from "../../fixtures/test-user";
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  deleteUser,
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
const auth = getAuth();
const storage = getStorage();

connectAuthEmulator(auth, "http://localhost:9099");
connectStorageEmulator(storage, "localhost", 9199);

export { app, auth, storage };

export async function getFirebaseTestContext() {
  return new Promise(async (resolve) => {
    process.env.FIREBASE_STORAGE_EMULATOR_HOST = "localhost:9199";

    const env = await initializeTestEnvironment({
      projectId: "project-1-74491",
    });
    const ctx = await new Promise((resolve) => {
      env.withSecurityRulesDisabled((ctx) => resolve(ctx));
    });

    resolve({ env, ctx });
  });
}

export async function resetFirebaseEmulator() {
  const ctx = await getFirebaseTestContext();

  // Clear firebase storage
  await ctx.env.clearStorage();

  // Delete test user
  await signInWithEmailAndPassword(auth, testUser.email, testUser.password)
    .then(async ({ user }) => {
      await deleteUser(user);
    })
    .catch((error) => {
      console.log(error);
    });
}
