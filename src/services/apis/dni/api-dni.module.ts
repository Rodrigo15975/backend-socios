import { Module } from '@nestjs/common';
import { ApiDniController } from './api-dni.controller';
import { ApiDniService } from './api-dni.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ApiDniController],
  providers: [ApiDniService],
})
export class ApiDniModule {}
