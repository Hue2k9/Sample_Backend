import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DB_USER } from 'src/modules/repository/db-collection';
import { UserDocument } from '../entities/user.entity';
import { Model } from 'mongoose';
import { userDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(DB_USER)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: userDto) {
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async get(conditions: any) {
    const user = await this.userModel.find(conditions);
    return user;
  }
}
