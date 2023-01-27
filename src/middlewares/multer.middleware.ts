import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';

export const storage: StorageEngine = multer.diskStorage({

  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '.././public/uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});
