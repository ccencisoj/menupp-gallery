import axios from "axios";
import { auth } from "boot/firebase";

console.log("functions: ", process.env.FUNCTIONS_BASE_URL);

const http = axios.create({
  baseURL: process.env.FUNCTIONS_BASE_URL,
});

const functions = {
  uploadImage: async (imageBlob) => {
    const formData = new FormData();

    formData.set("image", imageBlob);

    return http.post("/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
      },
    });
  },
  setProfileImage: async (imageBlob) => {
    const formData = new FormData();

    formData.set("image", imageBlob);

    return http.post("/profileImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
      },
    });
  },
};

export { functions };
