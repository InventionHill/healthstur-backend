import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SuccessStoryCategoryService } from './success-story-category.service';
import { CreateSuccessStoryCategoryDto } from './dto/create-success-story-category.dto';
import { UpdateSuccessStoryCategoryDto } from './dto/update-success-story-category.dto';

@Controller('success-story-category')
export class SuccessStoryCategoryController {
  constructor(
    private readonly successStoryCategoryService: SuccessStoryCategoryService,
  ) {}

  @Post()
  create(@Body() createDto: CreateSuccessStoryCategoryDto) {
    return this.successStoryCategoryService.create(createDto);
  }

  @Get('admin')
  findAll() {
    return this.successStoryCategoryService.findAll();
  }

  @Put('reorder')
  reorder(@Body() updates: { id: string; order: number }[]) {
    return this.successStoryCategoryService.reorder(updates);
  }

  @Get()
  findAllActive() {
    return this.successStoryCategoryService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.successStoryCategoryService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSuccessStoryCategoryDto,
  ) {
    return this.successStoryCategoryService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.successStoryCategoryService.remove(id);
  }
}
