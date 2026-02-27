import { Body, Controller, Get, Put } from '@nestjs/common';
import { PrivacyPolicyService } from './privacy-policy.service';
import { UpdatePrivacyPolicyDto } from './dto/update-privacy-policy.dto';

@Controller('privacy-policy')
export class PrivacyPolicyController {
  constructor(private readonly privacyPolicyService: PrivacyPolicyService) {}

  @Get()
  getPolicy() {
    return this.privacyPolicyService.getPolicy();
  }

  @Put()
  updatePolicy(@Body() updateDto: UpdatePrivacyPolicyDto) {
    return this.privacyPolicyService.updatePolicy(updateDto);
  }
}
