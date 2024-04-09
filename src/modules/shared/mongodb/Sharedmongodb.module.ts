import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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
  exports: [MongooseModule],
})
export class SharedMongodbModule {}
