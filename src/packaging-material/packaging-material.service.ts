import { Injectable } from '@nestjs/common';
import { CreatePackagingMaterialDto } from './dto/create-packaging-material.dto';
import { UpdatePackagingMaterialDto } from './dto/update-packaging-material.dto';

@Injectable()
export class PackagingMaterialService {
  create(createPackagingMaterialDto: CreatePackagingMaterialDto) {
    return 'This action adds a new packagingMaterial';
  }

  findAll() {
    return `This action returns all packagingMaterial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} packagingMaterial`;
  }

  update(id: number, updatePackagingMaterialDto: UpdatePackagingMaterialDto) {
    return `This action updates a #${id} packagingMaterial`;
  }

  remove(id: number) {
    return `This action removes a #${id} packagingMaterial`;
  }
}
