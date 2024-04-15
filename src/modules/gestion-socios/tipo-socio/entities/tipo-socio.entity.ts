import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'Tipo_socio',
})
export class TipoSocio {
  @Prop({
    required: true,
    trim: true,
    uppercase: true,
    unique: true,
  })
  socio: string;
}

export const SchemaTipoSocio = SchemaFactory.createForClass(TipoSocio);
