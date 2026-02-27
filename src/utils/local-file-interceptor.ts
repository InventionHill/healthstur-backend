import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

export function LocalFileFieldsInterceptor(
  fields: { name: string; maxCount: number }[],
  folderName = 'any',
  options: {
    baseDest?: string;
  } = {},
) {
  const baseDest = options.baseDest || './uploads';

  const storage = diskStorage({
    destination: (req, file, cb) => {
      try {
        const userWithOrg = req as any;
        const orgName = userWithOrg.user?.organization?.name || 'default';
        const destPath = path.join(baseDest, 'media', orgName, folderName);

        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }

        cb(null, destPath);
      } catch (err) {
        cb(err as Error, '');
      }
    },
    filename: (req, file, cb) => {
      try {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      } catch (err) {
        cb(err as Error, '');
      }
    },
  });

  return applyDecorators(
    UseInterceptors(FileFieldsInterceptor(fields, { storage })),
  );
}
