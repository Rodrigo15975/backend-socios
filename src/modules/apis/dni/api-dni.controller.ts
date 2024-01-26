import { Controller, Get, Query } from '@nestjs/common';
import { ApiDniService } from './api-dni.service';

@Controller('api-dni')
export class ApiDniController {
  constructor(private readonly serviceApiDni: ApiDniService) {}
  @Get()
  async hello(@Query('dni') dni: string) {
    return await this.serviceApiDni.getDni(dni);
  }
}
