import { Body, Controller, Get, Put } from '@nestjs/common';
import { RefundPolicyService } from './refund-policy.service';
import { UpdateRefundPolicyDto } from './dto/update-refund-policy.dto';

@Controller('refund-policy')
export class RefundPolicyController {
  constructor(private readonly refundPolicyService: RefundPolicyService) {}

  @Get()
  getPolicy() {
    return this.refundPolicyService.getPolicy();
  }

  @Put()
  updatePolicy(@Body() updateDto: UpdateRefundPolicyDto) {
    return this.refundPolicyService.updatePolicy(updateDto);
  }
}
