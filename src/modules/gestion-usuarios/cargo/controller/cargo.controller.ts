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
import { AuthUserGuard } from 'src/modules/auth/guards/auth-guards';
import { CreateCargoDto } from '../dto/create-cargo.dto';
import { UpdateCargoDto } from '../dto/update-cargo.dto';
import { CargoService } from '../services/cargo.service';

@UseGuards(AuthUserGuard)
@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Post()
  create(@Body() createCargoDto: CreateCargoDto) {
    return this.cargoService.create(createCargoDto);
  }

  @Get()
  findAll() {
    return this.cargoService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargoService.update(id, updateCargoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cargoService.remove(id);
  }
}
