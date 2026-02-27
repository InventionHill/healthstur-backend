import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SuccessStoryService } from './success-story.service';
import { CreateSuccessStoryDto } from './dto/create-success-story.dto';
import { UpdateSuccessStoryDto } from './dto/update-success-story.dto';

@Controller('success-story')
export class SuccessStoryController {
  constructor(private readonly successStoryService: SuccessStoryService) {}

  @Post()
  create(@Body() createDto: CreateSuccessStoryDto) {
    return this.successStoryService.create(createDto);
  }

  @Get('admin')
  findAll() {
    return this.successStoryService.findAll();
  }

  @Put('reorder')
  reorder(@Body() updates: { id: string; order: number }[]) {
    return this.successStoryService.reorder(updates);
  }

  @Get()
  findAllActive() {
    return this.successStoryService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.successStoryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateSuccessStoryDto) {
    return this.successStoryService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.successStoryService.remove(id);
  }
}
