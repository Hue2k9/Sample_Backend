import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import * as mongoose from 'mongoose';
import { DB_USER } from 'src/modules/repository/db-collection';

@Schema({
  collection: DB_USER,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class User {
  @IsString()
  @ApiProperty()
  @Prop({ required: true, unique: true })
  @IsEmail()
  username: string;

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = mongoose.Document & User;
