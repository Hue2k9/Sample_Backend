import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/entities/user.entity';
import * as db from './db-collection';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: db.DB_USER, schema: UserSchema }]),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class RepositoryModule {}
