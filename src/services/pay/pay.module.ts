import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';

import { PayService } from './services/pay.service';
import { PaySessionService } from './services/pay_session.service';
import { PaySessionController } from './controllers/pay_session.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Configuracion de stripe
      load: [config],
      // Configuracion de los variables de entorno
      envFilePath: '.env',
    }),
  ],
  controllers: [PaySessionController],
  providers: [PayService, PaySessionService],
})
export class PayModule {}
