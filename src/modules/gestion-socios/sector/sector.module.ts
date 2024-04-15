import { Module } from '@nestjs/common';
import { HandleErrors } from 'src/common';
import { SharedMongodbModule } from 'src/modules/shared/mongodb/Sharedmongodb.module';
import { SectorController } from './controller/sector.controller';
import { SectorService } from './services/sector.service';

@Module({
  imports: [SharedMongodbModule],
  controllers: [SectorController],
  providers: [SectorService, HandleErrors],
})
export class SectorModule {}
