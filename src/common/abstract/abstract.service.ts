import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationResponseDto } from 'src/utils/pagination/pagination-response.dto';
import {
  BaseEntity,
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  In,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

export interface RelationProp {
  firstArg: string;
  secondArg: string;
}

@Injectable()
export abstract class AbstractService<T> {
  constructor(
    protected readonly repository: Repository<T>,
    private readonly relations?: string[],
  ) {}

  // This method is for creating a query builder for the specific entity.
  // protected createQueryBuilder(): SelectQueryBuilder<T> {
  //   return this.repository.createQueryBuilder('entity');
  // }

  // This method is for joining specified relations in the query builder.
  // private joinRelations(
  //   queryBuilder: SelectQueryBuilder<T>,
  //   relationsProp: RelationProp[],
  // ): void {
  //   if (relationsProp && relationsProp.length > 0) {
  //     relationsProp.forEach((relation) => {
  //       queryBuilder.leftJoinAndSelect(relation.firstArg, relation.secondArg);
  //     });
  //   }
  // }

  // async create(entity: DeepPartial<T>): Promise<T> {
  //   return this.repository.save(entity);
  // }

  async create<D>(
    dto: D,
    entity: new () => T, // Change the parameter type to accept the entity class constructor.
    additionalParams?: (dto: D) => DeepPartial<T>,
  ): Promise<T> {
    const newEntity = Object.assign(new entity(), dto, additionalParams(dto));
    return await this.repository.save(newEntity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find({ relations: this.relations });
  }

  async findAllByCompany(companyId: string): Promise<T[]> {
    return this.repository.find({
      where: {
        company: {
          id: companyId,
        }, // Assuming 'company' is the property that represents the company relationship
      } as unknown as FindOptionsWhere<T> | FindOptionsWhere<T>[],
      relations: this.relations,
    });
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

  async findManyByIds(ids: string[], companyId: string): Promise<T[]> {
    //const options: any = { id };
    const findOptions: FindOneOptions<T> = {
      where: {
        id: In(ids),
        company: {
          id: companyId,
        },
      } as unknown as FindOptionsWhere<T> | FindOptionsWhere<T>[],
      relations: this.relations,
    };
    const entity = await this.repository.find(findOptions);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  async update<D>(
    id: string,
    updateDto: D,
    //entityClass: EntityTarget<T>,
    //relations?: string[],
  ): Promise<T> {
    const options: any = { id };
    const entity = await this.repository.findOne({
      where: options,
      relations: this.relations,
    });

    if (!entity) {
      throw new NotFoundException(`Entity not found!`);
    }

    for (const key of Object.keys(updateDto)) {
      if (updateDto[key] !== undefined) {
        entity[key] = updateDto[key];
      }
    }

    return await this.repository.save(entity);
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

  async paginatedByCompany(
    page: number,
    limit: number,
    companyId: string,
  ): Promise<PaginationResponseDto<T>> {
    const [data, totalCount] = await this.repository.findAndCount({
      where: {
        company: {
          id: companyId,
        }, // Assuming 'company' is the property that represents the company relationship
      } as unknown as FindOptionsWhere<T> | FindOptionsWhere<T>[],
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

  // This method allows you to retrieve a single entity with specified relations by ID.
  // async findOneWithRelationsById(
  //   id: string | number,
  //   relationsProp?: RelationProp[],
  // ): Promise<T> {
  //   const queryBuilder = this.createQueryBuilder();

  //   this.joinRelations(queryBuilder, relationsProp);

  //   return await queryBuilder.where('entity.id = :id', { id }).getOne();
  // }

  // This method allows you to retrieve multiple entities with specified relations.
  // async findManyWithRelations(relationsProp?: RelationProp[]): Promise<T[]> {
  //   const queryBuilder = this.createQueryBuilder();

  //   this.joinRelations(queryBuilder, relationsProp);

  //   return await queryBuilder.getMany();
  // }
}
