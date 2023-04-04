import cloudinaryModule from 'cloudinary';
import 'dotenv/config';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// CONFIURATION FOR CLOUDINARY IMAGE STORAGE
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Hertzcars',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  },
});

export { cloudinary, storage };
