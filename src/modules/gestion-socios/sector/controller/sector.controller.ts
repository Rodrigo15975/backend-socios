import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateSectorDto } from '../dto/create-sector.dto';
import { UpdateSectorDto } from '../dto/update-sector.dto';
import { SectorService } from '../services/sector.service';
import { AuthUserGuard } from 'src/modules/auth/guards/auth-guards';

@UseGuards(AuthUserGuard)
@Controller('sector')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  create(@Body() createSectorDto: CreateSectorDto) {
    return this.sectorService.create(createSectorDto);
  }

  @Get()
  findAll() {
    return this.sectorService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectorDto: UpdateSectorDto) {
    return this.sectorService.update(id, updateSectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectorService.remove(id);
  }
}
