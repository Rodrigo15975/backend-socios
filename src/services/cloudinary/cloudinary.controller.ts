import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryServices: CloudinaryService) {}
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async file(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinaryServices.upload(file);
  }
}
