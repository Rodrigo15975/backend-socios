import { Module } from '@nestjs/common';
import { SharedMongodbModule } from 'src/modules/shared/mongodb/Sharedmongodb.module';
import { CargoController } from './controller/cargo.controller';
import { CargoService } from './services/cargo.service';

@Module({
  imports: [SharedMongodbModule],
  controllers: [CargoController],
  providers: [CargoService],
  exports: [CargoService],
})
export class CargoModule {}
