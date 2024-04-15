import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { AuthUserGuard } from 'src/modules/auth/guards/auth-guards';

@UseGuards(AuthUserGuard)
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryServices: CloudinaryService) {}
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async file(
    @UploadedFile() file: Express.Multer.File,
    @Query('id') id_empresa: string,
  ) {
    return await this.cloudinaryServices.uploadFile(file, id_empresa);
  }

  @Post('files')
  @UseInterceptors(FilesInterceptor('photos'))
  async files(@UploadedFiles() file: Express.Multer.File[]) {
    return await this.cloudinaryServices.uploadFiles(file);
  }
}
