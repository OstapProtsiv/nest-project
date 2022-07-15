import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file) {
    try {
      const imgName = uuid.v4() + '.png';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdir(filePath, (err) => {
          if (err) throw err;
        });
      }
      fs.writeFile(path.join(filePath, imgName), file.buffer, (err) => {
        if (err) throw err;
      });
      return imgName;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Could not write into file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
