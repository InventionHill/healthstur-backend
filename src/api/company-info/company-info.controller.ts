import { Body, Controller, Get, Put } from '@nestjs/common';
import { CompanyInfoService } from './company-info.service';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';

@Controller('company-info')
export class CompanyInfoController {
  constructor(private readonly companyInfoService: CompanyInfoService) {}

  @Get()
  getInfo() {
    return this.companyInfoService.getInfo();
  }

  @Put()
  updateInfo(@Body() updateDto: UpdateCompanyInfoDto) {
    return this.companyInfoService.updateInfo(updateDto);
  }
}
