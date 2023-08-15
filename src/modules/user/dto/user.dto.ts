import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { BaseDTO } from '../../../common/dto/base/base.dto';
import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class userDto extends PickType(User, ['username', 'password']) {}
// export class userDto extends BaseDTO {
//   @ApiProperty()
//   @IsEmail()
//   // @Expose()
//   username: string;

//   // @Expose()
//   @ApiProperty()
//   password: string;
// }
