import { PartialType } from '@nestjs/mapped-types';
import { PropsTipoSocioDto } from './create-tipo-socio.dto';

export class UpdateTipoSocioDto extends PartialType(PropsTipoSocioDto) {}
