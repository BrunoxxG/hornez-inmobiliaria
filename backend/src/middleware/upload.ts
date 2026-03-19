import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// helper to upload buffer to cloudinary
export const uploadToCloudinary = (buffer: Buffer, folder = 'hornez') =>
  new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    const stream = Readable.from(buffer);
    stream.pipe(uploadStream);
  });

// middleware to handle files and upload to cloudinary
export default async function (req: any, res: any, next: any) {
  // multer has already populated req.files as buffers
  const files = req.files as Express.Multer.File[] | undefined;
  if (!files || files.length === 0) return next();

  try {
    const uploaded = await Promise.all(
      files.map(async (f) => {
        const result: any = await uploadToCloudinary(f.buffer);
        return result;
      })
    );
    // attach uploaded results
    req.files = uploaded;
    next();
  } catch (err) {
    next(err);
  }
}

export { upload };
