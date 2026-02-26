import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Controller('testimonial')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Post()
  create(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialService.create(createTestimonialDto);
  }

  @Get('admin')
  findAll() {
    return this.testimonialService.findAll();
  }

  @Put('reorder')
  reorder(@Body() updates: { id: string; order: number }[]) {
    return this.testimonialService.reorder(updates);
  }

  @Get()
  findAllActive() {
    return this.testimonialService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testimonialService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    return this.testimonialService.update(id, updateTestimonialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testimonialService.remove(id);
  }
}
