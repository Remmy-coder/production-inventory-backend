import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
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
import { CustomMailerService } from 'src/custom-mailer/custom-mailer.service';
import { IUserEmailVerificationPayload } from 'src/custom-mailer/interfaces/userEmailVerification.interface';
import { UserVerificationStatus } from 'src/utils/enums/user-verification-status.enum';

@Injectable()
export class UserService extends AbstractService<User> {
  constructor(
    @Inject(userConstants.provide)
    private userRepository: Repository<User>,
    private readonly companyService: CompanyService,
    private readonly customMailerService: CustomMailerService,
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

      const newlyCreatedUser = await this.create(
        createUserDto,
        User, // Provide the entity class constructor.
        (dto) => ({
          company,
        }),
      );

      const emailPayload: IUserEmailVerificationPayload = {
        firstName: newlyCreatedUser.firstName,
        verificationUrl: `http://localhost:3002/user/emailVerification/${newlyCreatedUser.verificationToken}`,
        email: newlyCreatedUser.email,
      };

      this.customMailerService.userEmailVerification(emailPayload);

      return newlyCreatedUser;
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyEmail(verificationToken: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          verificationToken: verificationToken,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found or already verified');
      }

      user.isVerified = UserVerificationStatus.VERIFIED;
      user.verificationToken = null;

      return this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }
}
