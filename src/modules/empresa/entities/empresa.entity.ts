import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'Empresa',
})
export class Empresa {
  @Prop({
    required: true,
    trim: true,
    uppercase: true,
  })
  nombre: string;

  @Prop({
    required: true,
    trim: true,
    unique: true,
  })
  ruc: string;

  @Prop({ trim: true, uppercase: true })
  direccion: string;

  @Prop({
    trim: true,
  })
  logo: string;

  @Prop({
    trim: true,
  })
  id_logo: string;

  @Prop({
    trim: true,
  })
  telefono: string;

  @Prop({
    required: true,
    trim: true,
  })
  celular: string;

  @Prop({
    default: false,
  })
  isRegisterEmpresa: boolean;
}

export const SchemaEmpresa = SchemaFactory.createForClass(Empresa);
