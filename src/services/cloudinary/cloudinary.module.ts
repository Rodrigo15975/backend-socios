import { Module } from '@nestjs/common';
import { EmpresaService } from 'src/modules/empresa/empresa.service';
import { SharedMongodbModule } from 'src/modules/shared/mongodb/Sharedmongodb.module';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [SharedMongodbModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, EmpresaService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
