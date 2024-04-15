import { Type } from 'class-transformer';
import { Matches, MinLength, ValidateNested } from 'class-validator';
import { generalValidation, messageValidation } from 'src/common';

export class CreateSectorDto {
  @ValidateNested({ each: true }) // Validar cada objeto en el array
  @Type(() => PropsSectorDto) // Valida los valores de la Props, se usa junto con validateNested
  sectores: PropsSectorDto[];
}
export class PropsSectorDto {
  @MinLength(2, { message: 'Mínimo 2 caracteres' })
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  sector: string;
}
