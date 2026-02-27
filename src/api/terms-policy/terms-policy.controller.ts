import { Body, Controller, Get, Put } from '@nestjs/common';
import { TermsPolicyService } from './terms-policy.service';
import { UpdateTermsPolicyDto } from './dto/update-terms-policy.dto';

@Controller('terms-policy')
export class TermsPolicyController {
  constructor(private readonly termsPolicyService: TermsPolicyService) {}

  @Get()
  getPolicy() {
    return this.termsPolicyService.getPolicy();
  }

  @Put()
  updatePolicy(@Body() updateDto: UpdateTermsPolicyDto) {
    return this.termsPolicyService.updatePolicy(updateDto);
  }
}
