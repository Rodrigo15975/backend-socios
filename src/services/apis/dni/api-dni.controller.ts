import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiDniService } from './api-dni.service';
import { AuthUserGuard } from 'src/modules/auth/guards/auth-guards';

@UseGuards(AuthUserGuard)
@Controller('api-dni')
export class ApiDniController {
  constructor(private readonly serviceApiDni: ApiDniService) {}
  @Get()
  async getDni(@Query('dni') dni: string) {
    return await this.serviceApiDni.getDni(dni);
  }
}
