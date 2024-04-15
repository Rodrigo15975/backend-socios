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
import { CreateActividadDto } from '../dto/create-actividad.dto';
import { UpdateActividadDto } from '../dto/update-actividad.dto';
import { ActividadService } from '../services/actividad.service';
import { AuthUserGuard } from 'src/modules/auth/guards/auth-guards';

@UseGuards(AuthUserGuard)
@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  create(@Body() createActividadDto: CreateActividadDto) {
    return this.actividadService.create(createActividadDto);
  }

  @Get()
  findAll() {
    return this.actividadService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActividadDto: UpdateActividadDto,
  ) {
    return this.actividadService.update(id, updateActividadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actividadService.remove(id);
  }
}
