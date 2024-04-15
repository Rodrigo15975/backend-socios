import { PartialType } from '@nestjs/mapped-types';
import { PropsActividadDto } from './create-actividad.dto';

export class UpdateActividadDto extends PartialType(PropsActividadDto) {}
