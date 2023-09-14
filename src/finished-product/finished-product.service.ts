import { Injectable } from '@nestjs/common';
import { CreateFinishedProductDto } from './dto/create-finished-product.dto';
import { UpdateFinishedProductDto } from './dto/update-finished-product.dto';

@Injectable()
export class FinishedProductService {
  create(createFinishedProductDto: CreateFinishedProductDto) {
    return 'This action adds a new finishedProduct';
  }

  findAll() {
    return `This action returns all finishedProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} finishedProduct`;
  }

  update(id: number, updateFinishedProductDto: UpdateFinishedProductDto) {
    return `This action updates a #${id} finishedProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} finishedProduct`;
  }
}
