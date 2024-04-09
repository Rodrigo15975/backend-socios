import { Module } from '@nestjs/common';
import { HandleErrors } from 'src/common';
import { TipoUsuarioController } from './controller/tipo_usuario.controller';
import { TipoUsuarioService } from './services/tipo_usuario.service';
import { SharedMongodbModule } from 'src/modules/shared/mongodb/Sharedmongodb.module';

@Module({
  imports: [SharedMongodbModule],
  controllers: [TipoUsuarioController],
  providers: [TipoUsuarioService, HandleErrors],
  exports: [TipoUsuarioService],
})
export class TipoUsuarioModule {}
