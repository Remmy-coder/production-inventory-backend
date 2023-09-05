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
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SETTINGS } from 'app.utils';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body(SETTINGS.VALIDATION_PIPE) createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.userRegistration(createUserDto);
      return user;
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL error code for unique constraint violation
        throw new ConflictException(
          'Duplicate entry. Please provide unique values.',
        );
      }
      if (error.response.statusCode == 409) {
        throw new ConflictException(error.response.message);
      }
      console.log(error);
    }
  }

  @Get('')
  async paginatedUser(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    page = page || 1; // Default to page 1
    limit = limit || 10; // Default to 10 items per page

    return this.userService.paginatedUser(page, limit);
  }

  @Get('All')
  async findAll() {
    return this.userService.findAll();
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
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
