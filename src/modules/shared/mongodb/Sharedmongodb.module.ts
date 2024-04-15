import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HandleErrors } from 'src/common';
import {
  Empresa,
  SchemaEmpresa,
} from 'src/modules/empresa/entities/empresa.entity';
import {
  Actividad,
  SchemaActividad,
} from 'src/modules/gestion-socios/actividad/entities/actividad.entity';
import {
  SchemaSector,
  Sector,
} from 'src/modules/gestion-socios/sector/entities/sector.entity';
import {
  SchemaSocios,
  Socio,
} from 'src/modules/gestion-socios/socios/entities/socio.entity';
import {
  SchemaTipoSocio,
  TipoSocio,
} from 'src/modules/gestion-socios/tipo-socio/entities/tipo-socio.entity';

import {
  Cargo,
  SchemaCargo,
} from 'src/modules/gestion-usuarios/cargo/entities/cargo.entity';
import {
  SchemaTipoUsuario,
  TipoUsuario,
} from 'src/modules/gestion-usuarios/tipo_usuario/entities/tipo_usuario.entity';
import {
  SchemaUsuario,
  Usuario,
} from 'src/modules/gestion-usuarios/usuarios/entities/usuario.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      {
        name: Socio.name,
        schema: SchemaSocios,
      },
      {
        name: TipoSocio.name,
        schema: SchemaTipoSocio,
      },
      {
        name: Sector.name,
        schema: SchemaSector,
      },
      {
        name: Actividad.name,
        schema: SchemaActividad,
      },
      {
        name: Empresa.name,
        schema: SchemaEmpresa,
      },
      {
        name: Usuario.name,
        schema: SchemaUsuario,
      },
      {
        name: Cargo.name,
        schema: SchemaCargo,
      },
      {
        name: TipoUsuario.name,
        schema: SchemaTipoUsuario,
      },
    ]),
    MongooseModule.forRoot(process.env.DATABASE_MONGO_URI),
  ],
  providers: [HandleErrors],
  exports: [MongooseModule, HandleErrors],
})
export class SharedMongodbModule {}
