import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TipoSocioService } from '../services/tipo-socio.service';
import { CreateTipoSocioDto } from '../dto/create-tipo-socio.dto';
import { UpdateTipoSocioDto } from '../dto/update-tipo-socio.dto';
import { AuthUserGuard } from 'src/modules/auth/guards/auth-guards';

@UseGuards(AuthUserGuard)
@Controller('tipo-socio')
export class TipoSocioController {
  constructor(private readonly tipoSocioService: TipoSocioService) {}

  @Post()
  create(@Body() createTipoSocioDto: CreateTipoSocioDto) {
    return this.tipoSocioService.create(createTipoSocioDto);
  }

  @Get()
  findAll() {
    return this.tipoSocioService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoSocioDto: UpdateTipoSocioDto,
  ) {
    return this.tipoSocioService.update(id, updateTipoSocioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoSocioService.remove(id);
  }
}
