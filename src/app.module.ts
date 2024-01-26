import { Module } from '@nestjs/common';
import { SharedPostgresqlModule } from './shared/postgresql/Sharedpostgresql.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [SharedPostgresqlModule, SharedPostgresqlModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
