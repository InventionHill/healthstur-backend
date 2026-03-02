import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new country' })
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all countries (Admin)' })
  findAll() {
    return this.countriesService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active countries (Public)' })
  findActive() {
    return this.countriesService.findActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a country by ID' })
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a country' })
  update(
    @Param('id') id: string,
    @Body() updateCountryDto: Partial<CreateCountryDto>,
  ) {
    return this.countriesService.update(id, updateCountryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a country' })
  remove(@Param('id') id: string) {
    return this.countriesService.remove(id);
  }
}
