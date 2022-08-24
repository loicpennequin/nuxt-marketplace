import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import crypto from 'crypto';
import multer from 'multer';

export const uploadImage = () => () => {
  const config = useRuntimeConfig();

  cloudinary.config({
    cloud_name: config.cloudinaryId,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      public_id(_, file) {
        const [name, type] = file.originalname.split('.');
        return `${name}-${crypto.randomBytes(8).toString('hex')}.${type}`;
      }
    }
  });

  return multer({ storage }).single('file');
};
// };
// // import multer from 'multer';
// import type { Options } from 'multer';
// import fs from 'fs-extra';
// import crypto from 'crypto';

// const UPLOAD_PATH = './public/temp';
// export const uploadService = () => {
//   const generateHandler = () => {
//     const options: Options = {
//       limits: {
//         files: 1,
//         fieldNameSize: 400,
//         fileSize: 80 * 1024 * 1024
//       },
//       storage: multer.diskStorage({
//         filename: (_, file, cb) => {
//           const [name, type] = file.originalname.split('.');
//           const fileName = `${name}-${crypto
//             .randomBytes(8)
//             .toString('hex')}.${type}`;
//           cb(null, fileName);
//         },
//         destination: async (_req, _file, cb) => {
//           fs.ensureDirSync(UPLOAD_PATH);
//           cb(null, UPLOAD_PATH);
//         }
//       })
//     };

//     return multer(options).single('file');
//   };
//   return { generateHandler };
// };
