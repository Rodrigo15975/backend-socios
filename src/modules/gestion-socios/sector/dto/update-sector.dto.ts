import { PartialType } from '@nestjs/mapped-types';
import { PropsSectorDto } from './create-sector.dto';

export class UpdateSectorDto extends PartialType(PropsSectorDto) {}
