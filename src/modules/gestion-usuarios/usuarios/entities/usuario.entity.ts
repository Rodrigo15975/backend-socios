import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TipoUsuario } from '../../tipo_usuario/entities/tipo_usuario.entity';
import { Cargo } from '../../cargo/entities/cargo.entity';

@Schema({
  collection: 'Usuario',
  timestamps: true,
})
export class Usuario {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  dni: string;

  @Prop({
    required: true,
    trim: true,
    uppercase: true,
  })
  nombres: string;

  @Prop({
    required: true,
    trim: true,
    uppercase: true,
  })
  apellidos: string;

  @Prop({
    trim: true,
    uppercase: true,
  })
  direccion: string;

  @Prop({
    ref: TipoUsuario.name,
    type: Types.ObjectId,
    trim: true,
    required: true,
  })
  id_tipo: TipoUsuario;

  @Prop({
    ref: Cargo.name,
    type: Types.ObjectId,
    trim: true,
    required: true,
  })
  id_cargo: Cargo;

  @Prop({
    trim: true,
  })
  telefono: string;

  @Prop({
    required: true,
    trim: true,
  })
  contraseña: string;

  @Prop({
    required: true,
    trim: true,
    uppercase: true,
  })
  celular: string;
}

export const SchemaUsuario = SchemaFactory.createForClass(Usuario);
