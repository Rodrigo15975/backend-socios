import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { generalValidation, messageValidation } from 'src/common';

export class CreateCargoDto {
  @ValidateNested({ each: true })
  @Type(() => PropsCreateCargoDto)
  cargos: PropsCreateCargoDto[];
}
export class PropsCreateCargoDto {
  @IsNotEmpty({
    message: 'Requerido',
  })
  @MinLength(2, { message: 'Mínimo 2 caracteres' })
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  cargo: string;
}
