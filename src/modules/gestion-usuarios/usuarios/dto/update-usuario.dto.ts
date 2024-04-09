import { PartialType } from '@nestjs/mapped-types';
import { PropsCreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(PropsCreateUsuarioDto) {}
