import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  HttpException,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SETTINGS } from 'app.utils';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body(SETTINGS.VALIDATION_PIPE) createUserDto: CreateUserDto) {
    const user = await this.userService.userRegistration(createUserDto);
    return user;
  }

  @Get()
  async paginatedUser(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Req() req: Request,
  ) {
    page = page || 1; // Default to page 1
    limit = limit || 10; // Default to 10 items per page
    const companyId = req['user'].companyId;

    return this.userService.paginatedByCompany(page, limit, companyId);
  }

  @Get('All')
  async findAll(@Req() req: Request) {
    const companyId = req['user'].companyId;
    return this.userService.findAllByCompany(companyId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (user) return user;
    else throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
  }

  @Get(':email')
  async findOneByEmail(@Param('email') email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user) return user;
    else throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(SETTINGS.VALIDATION_PIPE) updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Public()
  @Get('emailVerification/:token')
  async userVerification(@Param('token') token: string) {
    return await this.userService.verifyEmail(token);
  }
}
