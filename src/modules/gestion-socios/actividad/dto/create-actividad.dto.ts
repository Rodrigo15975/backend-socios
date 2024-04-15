import { Type } from 'class-transformer';
import { Matches, MinLength, ValidateNested } from 'class-validator';
import { generalValidation, messageValidation } from 'src/common';

export class CreateActividadDto {
  @ValidateNested({ each: true }) // Validar cada objeto en el array
  @Type(() => PropsActividadDto) // Valida los valores de la Props, se usa junto con validateNested
  actividades: PropsActividadDto[];
}

export class PropsActividadDto {
  @MinLength(2, { message: 'Mínimo 2 caracteres' })
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  actividad: string;
}
