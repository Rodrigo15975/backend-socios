import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'Cargo',
})
export class Cargo {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
  })
  cargo: string;
}

export const SchemaCargo = SchemaFactory.createForClass(Cargo);
