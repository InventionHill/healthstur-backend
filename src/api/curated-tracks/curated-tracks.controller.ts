import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CuratedTracksService } from './curated-tracks.service';
import { CreateCuratedTrackDto } from './dto/create-curated-track.dto';
import { UpdateCuratedTrackDto } from './dto/update-curated-track.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('curated-tracks')
export class CuratedTracksController {
  constructor(private readonly curatedTracksService: CuratedTracksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createDto: CreateCuratedTrackDto) {
    return this.curatedTracksService.create(createDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4() + extname(file.originalname);
          cb(null, uniqueSuffix);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return {
      url: `/uploads/${file.filename}`,
    };
  }

  @Get()
  findAll() {
    return this.curatedTracksService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('reorder')
  reorder(@Body() updates: { id: string; order: number }[]) {
    return this.curatedTracksService.reorder(updates);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.curatedTracksService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCuratedTrackDto) {
    return this.curatedTracksService.update(id, updateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.curatedTracksService.remove(id);
  }
}
