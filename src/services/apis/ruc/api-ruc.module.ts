import { Module } from '@nestjs/common';
import { ApiRucController } from './api-ruc.controller';
import { ApiRucService } from './api-ruc.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ApiRucController],
  providers: [ApiRucService],
})
export class ApiRucModule {}
