import { Module } from '@nestjs/common';
import { SharedPostgresqlModule } from './shared/postgresql/Sharedpostgresql.module';

@Module({
  imports: [SharedPostgresqlModule, SharedPostgresqlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
