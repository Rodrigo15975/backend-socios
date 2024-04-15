import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TipoSocio } from '../../tipo-socio/entities/tipo-socio.entity';
import { Sector } from '../../sector/entities/sector.entity';
import { Actividad } from '../../actividad/entities/actividad.entity';
import { Usuario } from 'src/modules/gestion-usuarios/usuarios/entities/usuario.entity';

@Schema({
  timestamps: true,
  collection: 'Socios',
})
export class Socio {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  ruc: string;

  @Prop({
    required: true,
    trim: true,
    uppercase: true,
  })
  razon_social: string;

  @Prop({
    required: true,
    trim: true,
  })
  dni: string;

  @Prop({
    trim: true,
  })
  telefono: string;

  @Prop({
    trim: true,
    uppercase: true,
    required: true,
  })
  correo: string;

  @Prop({
    trim: true,
    uppercase: true,
    required: true,
  })
  representante_legal: string;

  @Prop({
    trim: true,
    required: true,
  })
  fecha_inicio_actividades: string;

  @Prop({
    trim: true,
    required: true,
  })
  fecha_inscripcion: string;

  @Prop({
    trim: true,
  })
  partida_registral: string;

  @Prop({
    trim: true,
    required: true,
    uppercase: true,
  })
  provincia: string;

  @Prop({
    trim: true,
    required: true,
    uppercase: true,
  })
  departamento: string;

  @Prop({
    trim: true,
    required: true,
    uppercase: true,
  })
  distrito: string;

  @Prop({
    trim: true,
    required: true,
  })
  celular: string;

  @Prop({
    trim: true,
  })
  direccion1: string;

  @Prop({
    trim: true,
  })
  direccion2: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    trim: true,
    ref: TipoSocio.name,
  })
  id_tipo_socio: TipoSocio;

  @Prop({
    required: true,
    trim: true,
    type: Types.ObjectId,
    ref: Sector.name,
  })
  id_sector: Sector;

  @Prop({
    required: true,
    trim: true,
    type: Types.ObjectId,
    ref: Actividad.name,
  })
  id_actividad: Actividad;

  @Prop({
    required: true,
    trim: true,
    type: Types.ObjectId,
    ref: Usuario.name,
  })
  id_usuario: Usuario;
}

export const SchemaSocios = SchemaFactory.createForClass(Socio);
