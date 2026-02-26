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
import { CuratedTracksModule } from './api/curated-tracks/curated-tracks.module';
import { FaqModule } from './api/faq/faq.module';
import { TestimonialModule } from './api/testimonial/testimonial.module';
import { ResourceModule } from './api/resource/resource.module';

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
    CuratedTracksModule,
    FaqModule,
    TestimonialModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
