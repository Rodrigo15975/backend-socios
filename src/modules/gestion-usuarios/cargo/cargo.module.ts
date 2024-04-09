import { Module } from '@nestjs/common';
import { HandleErrors } from 'src/common';
import { CargoController } from './controller/cargo.controller';
import { CargoService } from './services/cargo.service';
import { SharedMongodbModule } from 'src/modules/shared/mongodb/Sharedmongodb.module';

@Module({
  imports: [SharedMongodbModule],
  controllers: [CargoController],
  providers: [CargoService, HandleErrors],
  exports: [CargoService],
})
export class CargoModule {}
