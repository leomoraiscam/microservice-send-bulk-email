import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {};
    aws: {};
  };
  tmpFolder: string;
  uploadFolder: string;
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },
  config: {
    disk: {},
    aws: {
      bucket: 'application-barber',
    },
  },
} as IUploadConfig;
