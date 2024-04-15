import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { messageValidation, generalValidation } from 'src/common';

export class CreateTipoSocioDto {
  @ValidateNested({ each: true }) // Validar cada objeto en el array
  @Type(() => PropsTipoSocioDto) // Valida los valores de la Props, se usa junto con validateNested
  socios: PropsTipoSocioDto[];
}

// SALDRA EL ERROR IGUAL QUE DEL TIPO DE USUARIO Y CARGO
export class PropsTipoSocioDto {
  @IsNotEmpty({
    message: 'Requerido',
  })
  @MinLength(2, { message: 'Mínimo 2 caracteres' })
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  socio: string;
}
