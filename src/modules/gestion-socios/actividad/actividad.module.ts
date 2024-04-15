import { Module } from '@nestjs/common';
import { ActividadService } from './services/actividad.service';
import { ActividadController } from './controller/actividad.controller';
import { SharedMongodbModule } from 'src/modules/shared/mongodb/Sharedmongodb.module';
import { HandleErrors } from 'src/common';

@Module({
  imports: [SharedMongodbModule],
  controllers: [ActividadController],
  providers: [ActividadService, HandleErrors],
})
export class ActividadModule {}
