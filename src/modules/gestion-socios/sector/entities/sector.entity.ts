import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'Sector',
  timestamps: true,
})
export class Sector {
  @Prop({
    required: true,
    trim: true,
    uppercase: true,
    unique: true,
  })
  sector: string;
}

export const SchemaSector = SchemaFactory.createForClass(Sector);
