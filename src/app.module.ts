import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './api/auth/auth.module';
import { ProgramsModule } from './api/programs/programs.module';
import { FeaturesModule } from './api/features/features.module';
import { FaqModule } from './api/faq/faq.module';
import { TestimonialModule } from './api/testimonial/testimonial.module';
import { ResourceModule } from './api/resource/resource.module';
import { ServicesModule } from './api/services/services.module';
import { CompanyInfoModule } from './api/company-info/company-info.module';
import { ConsultationsModule } from './api/consultations/consultations.module';
import { ApplicationsModule } from './api/applications/applications.module';
import { FeedbackModule } from './api/feedback/feedback.module';
import { RefundPolicyModule } from './api/refund-policy/refund-policy.module';
import { PrivacyPolicyModule } from './api/privacy-policy/privacy-policy.module';
import { TermsPolicyModule } from './api/terms-policy/terms-policy.module';
import { SearchModule } from './api/search/search.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    ProgramsModule,
    FeaturesModule,
    FaqModule,
    TestimonialModule,
    ResourceModule,
    ServicesModule,
    CompanyInfoModule,
    ConsultationsModule,
    ApplicationsModule,
    FeedbackModule,
    RefundPolicyModule,
    PrivacyPolicyModule,
    TermsPolicyModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
