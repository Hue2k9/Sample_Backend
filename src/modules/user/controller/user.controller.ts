import {
  Body,
  Controller,
  Delete,
  Post,
  Get,
  Param,
  Put,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { userDto } from '../dto/user.dto';
import { ResponseDto } from 'src/common/dto/response/response.dto';
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @ApiQuery({ name: 'cond', required: false })
  async find(@Query('cond') cond: any) {
    const conditions: any = (cond && JSON.parse(cond)) || {};
    const data = await this.userService.get(conditions);
    return ResponseDto.create(data);
  }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: userDto })
  async create(@Body() user: userDto) {
    // const data = await this.userService.create(userDto.plainToClass(user));
    const data = await this.userService.create(user);
    return ResponseDto.create(data, 201);
  }
}
