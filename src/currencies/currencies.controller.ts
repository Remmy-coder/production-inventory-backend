import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('currencies')
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  // @Post()
  // create(@Body() createCurrencyDto: CreateCurrencyDto) {
  //   return this.currenciesService.create(createCurrencyDto);
  // }

  @Public()
  @Get()
  async findAll() {
    return this.currenciesService.findAll();
  }

  @Public()
  @Get(':cc')
  async findOne(@Param('cc') cc: string) {
    return this.currenciesService.findOneByCode(cc);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCurrencyDto: UpdateCurrencyDto,
  // ) {
  //   return this.currenciesService.update(+id, updateCurrencyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.currenciesService.remove(+id);
  // }
}
