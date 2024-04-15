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
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { EmpresaService } from './empresa.service';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { AuthUserGuard } from '../auth/guards/auth-guards';

@UseGuards(AuthUserGuard)
@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.create(createEmpresaDto);
  }

  @Patch(':id')
  update(@Body() updateEmpresaDto: UpdateEmpresaDto, @Param('id') id: string) {
    return this.empresaService.update(updateEmpresaDto, id);
  }
  @Get()
  findAll() {
    return this.empresaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.remove(id);
  }
}
