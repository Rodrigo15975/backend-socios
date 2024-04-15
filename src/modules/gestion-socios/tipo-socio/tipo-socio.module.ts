import { Module } from '@nestjs/common';
import { TipoSocioService } from './services/tipo-socio.service';
import { TipoSocioController } from './controller/tipo-socio.controller';
import { SharedMongodbModule } from 'src/modules/shared/mongodb/Sharedmongodb.module';
import { HandleErrors } from 'src/common';

@Module({
  imports: [SharedMongodbModule],
  controllers: [TipoSocioController],
  providers: [TipoSocioService, HandleErrors],
})
export class TipoSocioModule {}
