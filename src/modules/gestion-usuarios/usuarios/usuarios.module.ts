import { Module } from '@nestjs/common';
import { UsuariosController } from './controller/usuarios.controller';
import { UsuariosService } from './services/usuarios.service';
import { SharedMongodbModule } from 'src/modules/shared/mongodb/Sharedmongodb.module';

@Module({
  imports: [SharedMongodbModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
