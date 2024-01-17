import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// creas tu database en .net/nombredatabase
//  @......mongodb.net HOST
@Module({
  imports: [
    MongooseModule.forFeature([]),
    MongooseModule.forRoot(process.env.DATABASE_MONGO_URI),
  ],
  exports: [MongooseModule],
})
export class SharedMongodbModule {}
