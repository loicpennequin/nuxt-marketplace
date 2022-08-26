import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import crypto from 'crypto';
import multer from 'multer';

export const uploadImageMiddleware = () => {
  const config = useRuntimeConfig();

  cloudinary.config({
    cloud_name: config.cloudinaryId,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      const [name] = file.originalname.split('.');
      return {
        folder: import.meta.env.PROD ? 'prod' : 'dev',
        public_id: `${name}-${crypto.randomBytes(8).toString('hex')}`
      };
    }
  });

  return multer({ storage }).single('file');
};

export const uploadImage = (base64File: string) => {
  const config = useRuntimeConfig();

  cloudinary.config({
    cloud_name: config.cloudinaryId,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  });

  return cloudinary.uploader.upload(base64File, {
    folder: import.meta.env.PROD ? 'prod' : 'dev',
    public_id: `${crypto.randomBytes(15).toString('hex')}`
  });
};
