import { Controller, Get, Query } from '@nestjs/common';
import { ApiRucService } from './api-ruc.service';

@Controller('ruc')
export class ApiRucController {
  constructor(private readonly ApiRucServices: ApiRucService) {}
  @Get()
  async getRucInfo(@Query('ruc') ruc: string) {
    return await this.ApiRucServices.getRuc(ruc);
  }
}
