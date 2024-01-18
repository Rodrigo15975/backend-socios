import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// creas tu database en .net/nombredatabase
//  @......mongodb.net HOST
// El sharedMongo es global,
// el config, lo hace global
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([]),
    MongooseModule.forRoot(process.env.DATABASE_MONGO_URI),
  ],
  exports: [MongooseModule],
})
export class SharedMongodbModule {}
