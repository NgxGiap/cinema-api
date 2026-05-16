import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const start = Date.now();

    // Chạy sau khi response được gửi đi
    res.on('finish', () => {
      const duration = Date.now() - start;
      const statusCode = res.statusCode;

      // Màu khác nhau theo status code
      if (statusCode >= 500) {
        this.logger.error(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
      } else if (statusCode >= 400) {
        this.logger.warn(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
      } else {
        this.logger.log(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
      }
    });

    next();
  }
}
