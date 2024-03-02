import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PayModule } from './services/pay/pay.module';
import { EmailModule } from './services/email/email.module';

@Module({
  imports: [AuthModule, PayModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
