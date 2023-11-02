import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { userConstants } from './user.constants';
import { v4 as uuidv4 } from 'uuid';
import { PaginationResponseDto } from 'src/utils/pagination/pagination-response.dto';
import { AbstractService } from 'src/common/abstract/abstract.service';

@Injectable()
export class UserService extends AbstractService<User> {
  constructor(
    @Inject(userConstants.provide)
    private userRepository: Repository<User>,
    private readonly companyService: CompanyService,
  ) {
    super(userRepository, ['company', 'company.currency']);
  }

  async userRegistration(createUserDto: CreateUserDto): Promise<User> {
    try {
      const company = await this.companyService.findById(
        createUserDto.companyId,
      );

      if (!company) {
        throw new ConflictException('Company does not exists');
      }
      // const generatedID = uuidv4();
      // const user = new User();
      // user.id = generatedID;
      // user.firstName = createUserDto.firstName;
      // user.lastName = createUserDto.lastName;
      // user.email = createUserDto.email;
      // user.gender = createUserDto.gender;
      // user.password = createUserDto.password;
      // user.company = company;

      return this.create(
        createUserDto,
        User, // Provide the entity class constructor.
        (dto) => ({
          company,
        }),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        company: {
          currency: true,
        },
      },
    });
  }

  async paginatedUser(
    page: number,
    limit: number,
  ): Promise<PaginationResponseDto<User>> {
    try {
      const [data, totalCount] = await this.userRepository.findAndCount({
        relations: {
          company: {
            currency: true,
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      const totalPages = Math.ceil(totalCount / limit);

      const paginatedResponse: PaginationResponseDto<User> = {
        data,
        meta: {
          totalCount,
          totalPages,
          currentPage: page,
          pageSize: limit,
        },
      };

      return paginatedResponse;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string): Promise<Partial<User>> {
    const options: any = { id };
    const entity = await this.userRepository.findOne({
      where: options,
      relations: {
        company: true,
      },
    });

    const { password, ...result } = entity;
    return result;
  }

  async findOneByEmail(email: string): Promise<User> {
    const options: any = { email };
    const entity = await this.userRepository.findOne({
      where: options,
      relations: {
        company: true,
      },
    });

    //const { password, ...result } = entity;
    return entity;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const options: any = { id };
      const entity = await this.userRepository.findOne({
        where: options,
      });

      if (!entity) throw new NotFoundException('User not found!');

      entity.firstName = updateUserDto.firstName || entity.firstName;
      entity.lastName = updateUserDto.lastName || entity.lastName;
      entity.email = updateUserDto.email || entity.email;
      entity.gender = updateUserDto.gender || entity.gender;

      return this.userRepository.save(entity);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const options: any = { id };
      const entity = await this.userRepository.findOne({
        where: options,
      });

      if (!entity) throw new NotFoundException('User not found!');

      return this.userRepository.remove(entity);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
