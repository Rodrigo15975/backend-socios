import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiRucService } from './api-ruc.service';
import { AuthUserGuard } from 'src/modules/auth/guards/auth-guards';

@UseGuards(AuthUserGuard)
@Controller('ruc')
export class ApiRucController {
  constructor(private readonly ApiRucServices: ApiRucService) {}
  @Get()
  async getRucInfo(@Query('ruc') ruc: string) {
    return await this.ApiRucServices.getRuc(ruc);
  }
}
