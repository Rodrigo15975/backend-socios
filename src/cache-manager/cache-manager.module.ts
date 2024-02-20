import { Module } from '@nestjs/common';
import { CacheManagerService } from './cache-manager.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  providers: [CacheManagerService],
})
export class CacheManagerModule {}
