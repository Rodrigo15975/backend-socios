import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'Actividad',
  timestamps: true,
})
export class Actividad {
  @Prop({
    required: true,
    trim: true,
    uppercase: true,
    unique: true,
  })
  actividad: string;
}

export const SchemaActividad = SchemaFactory.createForClass(Actividad);
