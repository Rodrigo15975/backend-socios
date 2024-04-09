import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'Tipo_usuario',
})
export class TipoUsuario {
  @Prop({
    required: true,
    trim: true,
    uppercase: true,
    unique: true,
  })
  tipo_usuario: string;
}

export const SchemaTipoUsuario = SchemaFactory.createForClass(TipoUsuario);
