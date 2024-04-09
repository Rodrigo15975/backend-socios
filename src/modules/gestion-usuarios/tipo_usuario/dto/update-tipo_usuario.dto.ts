import { PartialType } from '@nestjs/mapped-types';
import { PropsTipoUsuarioDto } from './create-tipo_usuario.dto';

export class UpdateTipoUsuarioDto extends PartialType(PropsTipoUsuarioDto) {}
