import { Module } from '@nestjs/common';
import { SharedMongodbModule } from 'src/modules/shared/mongodb/Sharedmongodb.module';
import { TipoUsuarioController } from './controller/tipo_usuario.controller';
import { TipoUsuarioService } from './services/tipo_usuario.service';

@Module({
  imports: [SharedMongodbModule],
  controllers: [TipoUsuarioController],
  providers: [TipoUsuarioService],
  exports: [TipoUsuarioService],
})
export class TipoUsuarioModule {}
