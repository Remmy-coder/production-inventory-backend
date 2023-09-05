import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationResponseDto } from 'src/utils/pagination/pagination-response.dto';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export abstract class AbstractService<T> {
  constructor(
    protected readonly repository: Repository<T>,
    private readonly relations?: string[],
  ) {}

  async create(entity: DeepPartial<T>): Promise<T> {
    return this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find({ relations: this.relations });
  }

  async findById(id: string): Promise<T> {
    const options: any = { id };
    const findOptions: FindOneOptions<T> = {
      where: options,
      relations: this.relations,
    };
    const entity = await this.repository.findOne(findOptions);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  async update(id: string, entity: DeepPartial<T>): Promise<T> {
    const foundEntity = await this.findById(id);
    return this.repository.save({ ...foundEntity, ...entity });
  }

  async remove(id: string): Promise<T> {
    const entity = await this.findById(id);
    return this.repository.remove(entity);
  }

  async paginated(
    page: number,
    limit: number,
  ): Promise<PaginationResponseDto<T>> {
    const [data, totalCount] = await this.repository.findAndCount({
      relations: this.relations,
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(totalCount / limit);

    const paginatedResponse: PaginationResponseDto<T> = {
      data,
      meta: {
        totalCount,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    };

    return paginatedResponse;
  }
}
