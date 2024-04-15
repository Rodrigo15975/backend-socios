import { Module } from '@nestjs/common';
import { UsuariosController } from './controller/usuarios.controller';
import { UsuariosService } from './services/usuarios.service';
import { SharedMongodbModule } from 'src/modules/shared/mongodb/Sharedmongodb.module';
import { CargoService } from '../cargo/services/cargo.service';
import { TipoUsuarioService } from '../tipo_usuario/services/tipo_usuario.service';
import { HandleErrors } from 'src/common';

@Module({
  imports: [SharedMongodbModule],
  controllers: [UsuariosController],
  // Esta mrd arreglar con un solo archivo mucha mierda
  providers: [UsuariosService, CargoService, TipoUsuarioService, HandleErrors],
})
export class UsuariosModule {}
