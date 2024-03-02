import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import * as streamifier from 'streamifier';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class CloudinaryService {
  cloud = cloudinary.config({
    cloud_name: this.config.get('CLOUD_NAME'),
    api_key: this.config.get('API_KEY_CLOUD'),
    api_secret: this.config.get('API_SECRET_CLOUD'),
  });

  constructor(private readonly config: ConfigService) {}
  async upload(file: Express.Multer.File) {
    const result = await new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
    return { url: result.secure_url };
  }
}
