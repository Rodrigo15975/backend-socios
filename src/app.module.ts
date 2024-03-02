import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PayModule } from './services/pay/pay.module';
import { EmailModule } from './services/email/email.module';
import { CloudinaryModule } from './services/cloudinary/cloudinary.module';

@Module({
  imports: [AuthModule, PayModule, EmailModule, CloudinaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
