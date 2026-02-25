import { Module } from '@nestjs/common';
import { CuratedTracksController } from './curated-tracks.controller';
import { CuratedTracksService } from './curated-tracks.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CuratedTracksController],
  providers: [CuratedTracksService],
})
export class CuratedTracksModule {}
