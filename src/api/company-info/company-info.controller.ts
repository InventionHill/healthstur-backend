import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { CompanyInfoService } from './company-info.service';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('company-info')
export class CompanyInfoController {
  constructor(private readonly companyInfoService: CompanyInfoService) {}

  @Get()
  getInfo() {
    return this.companyInfoService.getInfo();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  updateInfo(@Body() updateDto: UpdateCompanyInfoDto) {
    return this.companyInfoService.updateInfo(updateDto);
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
}
