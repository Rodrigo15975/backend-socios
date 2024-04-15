import { Module } from '@nestjs/common';
import { SociosService } from './services/socios.service';
import { SociosController } from './controller/socios.controller';
import { SharedMongodbModule } from 'src/modules/shared/mongodb/Sharedmongodb.module';
import { HandleErrors } from 'src/common';
import { UsuariosService } from 'src/modules/gestion-usuarios/usuarios/services/usuarios.service';
import { TipoUsuarioService } from 'src/modules/gestion-usuarios/tipo_usuario/services/tipo_usuario.service';
import { TipoSocioService } from '../tipo-socio/services/tipo-socio.service';
import { ActividadService } from '../actividad/services/actividad.service';
import { SectorService } from '../sector/services/sector.service';
import { CargoService } from 'src/modules/gestion-usuarios/cargo/services/cargo.service';

@Module({
  imports: [SharedMongodbModule],
  controllers: [SociosController],
  providers: [
    SectorService,
    TipoSocioService,
    ActividadService,
    UsuariosService,
    SociosService,
    HandleErrors,
    TipoUsuarioService,
    TipoSocioService,
    CargoService,
  ],
  exports: [SociosService],
})
export class SociosModule {}
