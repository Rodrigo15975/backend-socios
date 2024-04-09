import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigServices {
  constructor(private readonly configService: ConfigService) {}
}
