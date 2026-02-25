import { PartialType } from '@nestjs/mapped-types';
import { CreateCuratedTrackDto } from './create-curated-track.dto';

export class UpdateCuratedTrackDto extends PartialType(CreateCuratedTrackDto) {}
