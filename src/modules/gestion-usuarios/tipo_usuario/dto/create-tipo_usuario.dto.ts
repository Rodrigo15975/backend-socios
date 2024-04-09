import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { messageValidation, generalValidation } from 'src/common';

export class CreateTipoUsuarioDto {
  @ValidateNested({ each: true }) // Validar cada objeto en el array
  @Type(() => PropsTipoUsuarioDto) // Valida los valores de la Props, se usa junto con validateNested
  tipos_usuarios: PropsTipoUsuarioDto[];
}
export class PropsTipoUsuarioDto {
  @IsNotEmpty({
    message: 'Requerido',
  })
  @MinLength(2, { message: 'Mínimo 2 caracteres' })
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  tipo_usuario: string;
}
