import { Type } from 'class-transformer';
import {
  IsNotEmpty,
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
  @IsNotEmpty()
  dni: string;

  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  @IsNotEmpty()
  nombres: string;

  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  @IsNotEmpty()
  @MinLength(3, { message: 'Mínimo 3 caracteres' })
  apellidos: string;

  @Matches(generalValidation.matchesDireccion, {
    message: messageValidation.msgDireccion,
  })
  @MinLength(4, { message: 'Mínimo 4 caracteres' })
  @IsNotEmpty()
  direccion: string;

  @Matches(generalValidation.matchesPhones, {
    message: messageValidation.msgPhones,
  })
  @IsNotEmpty()
  telefono: string;

  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: messageValidation.msgPassword,
  })
  @MinLength(4, { message: 'Mínimo 4 caracteres' })
  @IsNotEmpty()
  contraseña: string;

  @Matches(generalValidation.matchesPhones, {
    message: messageValidation.msgPhones,
  })
  @IsNotEmpty()
  celular: string;
}

// @IsNotEmpty()
// id_tipo?: TipoUsuario;

// @IsNotEmpty()
// id_cargo?: Cargo;
