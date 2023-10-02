const express = require("express");
const busboy = require("busboy");
const admin = require("firebase-admin");
const sharp = require("sharp");
const { onRequest } = require("firebase-functions/v2/https");
const { AuthException } = require("./exceptions/AuthException");
const { DataException } = require("./exceptions/DataException");
const { BaseException } = require("./exceptions/BaseException");

const isProduction = process.env.NODE_ENV === "production";

admin.initializeApp();

const auth = admin.auth();
const storage = admin.storage();
const bucket = storage.bucket();

const app = express();

const getUserFromRequest = async (req) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    throw new AuthException("Require auth token");
  }

  const token = authorization.slice(7);

  let user;
  try {
    user = await auth.verifyIdToken(token);
  } catch (error) {
    throw new AuthException("Invalid token");
  }

  return user;
};

const getImageAsBufferFromRequest = async (req, fieldName) => {
  return new Promise((resolve) => {
    try {
      const bb = busboy({
        headers: req.headers,
        limits: {
          files: 1,
          fields: 0,
        },
      });

      bb.on("file", async (name, file, info) => {
        if (name === fieldName && info.mimeType.startsWith("image/")) {
          const chunks = [];

          file.on("data", (data) => {
            chunks.push(data);
          });

          file.on("end", () => {
            resolve(Buffer.concat(chunks));
          });
        } else {
          file.resume();
          resolve(null);
        }
      });

      bb.on("close", () => {
        resolve(null);
      });

      bb.end(req.body);
    } catch (error) {
      resolve(null);
    }
  });
};

const handleRouteError = (req, res, error) => {
  if (error instanceof BaseException) {
    res.status(error.code).json(error.toJSON());
  } else {
    console.log(error);
    res.status(500).json({
      name: "UnknownError",
      message: "Unknown Error",
      code: 500,
    });
  }
};

app.post("/image", async (req, res) => {
  try {
    // Get user from the request
    const user = await getUserFromRequest(req);
    if (user == null) {
      throw new AuthException("Auth required");
    }

    // Get image as buffer from request
    const image = await getImageAsBufferFromRequest(req, "image");
    if (image == null) {
      throw new DataException("'image' field required");
    }

    // Define path and data of the image
    const id = "image-" + Date.now();
    const name = `${id}.png`;
    const path = `users/${user.uid}/images/${name}`;
    const bucketRef = bucket.file(path);

    // The image is processed and uploaded to storage
    sharp(image)
      .png()
      .resize({
        width: 720,
        fit: "contain",
      })
      .pipe(bucketRef.createWriteStream())
      .on("close", async () => {
        res.json({ success: true, image: { id, name, path } });
      });
  } catch (error) {
    handleRouteError(req, res, error);
  }
});

app.post("/profileImage", async (req, res) => {
  try {
    // Get user from the request
    const user = await getUserFromRequest(req);
    if (user == null) {
      throw new AuthException("Auth required");
    }

    // Get image as buffer from request
    const image = await getImageAsBufferFromRequest(req, "image");
    if (image == null) {
      throw new DataException("'image' field required");
    }

    // The image is processed and uploaded to storage
    const bucketRef = bucket.file(`users/${user.uid}/profile/image.png`);
    sharp(image)
      .png()
      .pipe(bucketRef.createWriteStream())
      .on("close", () => {
        res.json({ success: true });
      });
  } catch (error) {
    handleRouteError(req, res, error);
  }
});

exports.app = onRequest(
  {
    region: "us-central1",
    cors: isProduction ? ["https://menupp-gallery.vercel.app"] : true,
  },
  app
);
