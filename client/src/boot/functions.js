import axios from "axios";
import { auth } from "boot/firebase";

const http = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://app-sxz35o4oaa-uc.a.run.app"
      : "http://127.0.0.1:5001/project-1-74491/us-central1/app",
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
