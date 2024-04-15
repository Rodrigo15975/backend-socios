import { PartialType } from '@nestjs/mapped-types';
import { PropsCreateCargoDto } from './create-cargo.dto';

export class UpdateCargoDto extends PartialType(PropsCreateCargoDto) {}
