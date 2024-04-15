import { IsOptional, Matches, MinLength } from 'class-validator';
import { generalValidation, messageValidation } from 'src/common';

export class CreateEmpresaDto {
  @Matches(generalValidation.matchesLetras, {
    message: `El nombre ${messageValidation.msgLetras}`,
  })
  @MinLength(3, { message: 'El nombre mínimo 3 caracteres' })
  nombre: string;

  @Matches(generalValidation.matchesRuc, { message: messageValidation.msgRuc })
  ruc: string;

  @IsOptional()
  direccion: string;

  @IsOptional()
  logo: string;

  @IsOptional()
  telefono: string;

  @Matches(generalValidation.matchesPhones, {
    message: `El celular ${messageValidation.msgPhones}`,
  })
  celular: string;
}
