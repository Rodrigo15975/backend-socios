import { Module } from '@nestjs/common';
import { HandleErrors } from 'src/common';
import { SharedMongodbModule } from '../shared/mongodb/Sharedmongodb.module';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';

@Module({
  imports: [SharedMongodbModule],
  providers: [EmpresaService, HandleErrors],
  controllers: [EmpresaController],
  exports: [EmpresaService],
})
export class EmpresaModule {}
