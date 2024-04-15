import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import { EmpresaService } from 'src/modules/empresa/empresa.service';
import * as streamifier from 'streamifier';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class CloudinaryService {
  cloud = cloudinary.config({
    cloud_name: this.config.getOrThrow('CLOUD_NAME'),
    api_key: this.config.getOrThrow('API_KEY_CLOUD'),
    api_secret: this.config.getOrThrow('API_SECRET_CLOUD'),
  });

  constructor(
    private readonly config: ConfigService,
    private readonly empresaServices: EmpresaService,
  ) {}

  async uploadFile(file: Express.Multer.File, id_empresa: string) {
    const empresa = await this.empresaServices.findOne(id_empresa);
    await this.removeFile(empresa.logo, empresa.id_logo);

    const result = await new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    await this.empresaServices.updateLogo(result.secure_url, result.public_id);
  }

  async removeFile(logo: string, id_logo: string) {
    if (logo && id_logo) await cloudinary.uploader.destroy(id_logo);
  }

  async uploadFiles(files: Express.Multer.File[]) {
    const uploadPromises: Promise<CloudinaryResponse>[] = files.map((file) => {
      return new Promise<CloudinaryResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    });
    const results = await Promise.all(uploadPromises);
    return results.map((result) => ({ url: result.secure_url }));
  }
}
