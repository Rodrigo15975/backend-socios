import { Type } from 'class-transformer';
import {
  IsOptional,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { generalValidation, messageValidation } from 'src/common';

export class CreateUsuarioDto {
  @ValidateNested({ each: true })
  @Type(() => PropsCreateUsuarioDto)
  usuarios: PropsCreateUsuarioDto[];
}

export class PropsCreateUsuarioDto {
  @Matches(generalValidation.matchesDNI, {
    message: messageValidation.msgDNI,
  })
  dni: string;

  @Matches(generalValidation.matchesLetras, {
    message: `El nombre ${messageValidation.msgLetras}`,
  })
  nombres: string;

  @Matches(generalValidation.matchesLetras, {
    message: `el apellido ${messageValidation.msgLetras}`,
  })
  @MinLength(3, { message: 'El apellido mínimo 3 caracteres' })
  apellidos: string;

  @IsOptional()
  direccion: string;

  @IsOptional()
  telefono: string;

  @IsOptional()
  tipo: string;

  @IsOptional()
  cargo: string;

  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: messageValidation.msgPassword,
  })
  @MinLength(4, { message: 'La contraseña mínimo 4 caracteres' })
  contraseña: string;

  @Matches(generalValidation.matchesPhones, {
    message: `El celular ${messageValidation.msgPhones}`,
  })
  celular: string;
}
