import fs from 'fs';
import path from 'path';
import { injectable } from 'tsyringe';

import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

@injectable()
class DiskStorageProvider implements IStorageProvider {
  async save(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadFolder, file)
    );

    return file;
  }
}

export default DiskStorageProvider;
