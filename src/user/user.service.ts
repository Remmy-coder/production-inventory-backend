import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { userConstants } from './user.constants';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @Inject(userConstants.provide)
    private userRepository: Repository<User>,
    private readonly companyService: CompanyService,
  ) {}

  async userRegistration(createUserDto: CreateUserDto): Promise<User> {
    const company = await this.companyService.findOne(createUserDto.companyId);

    if (!company) {
      throw new ConflictException('Company does not exists');
    }
    const generatedID = uuidv4();
    const user = new User();
    user.id = generatedID;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.gender = createUserDto.gender;
    user.password = createUserDto.password;
    user.company = company;

    return user.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const options: any = { id };
    const entity = await this.userRepository.findOne({
      where: options,
    });
    return entity;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
