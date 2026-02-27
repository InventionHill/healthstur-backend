import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { VisitorService } from './visitor.service';

@Injectable()
export class TrackVisitMiddleware implements NestMiddleware {
  constructor(private readonly visitorService: VisitorService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Extract real IP behind proxies
    const ip =
      (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Track visit asynchronously (don't block the request)
    this.visitorService.track(ip, userAgent).catch((err) => {
      console.error('Failed to track visitor:', err);
    });

    next();
  }
}
