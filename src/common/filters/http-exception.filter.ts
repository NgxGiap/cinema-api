import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch() // Bắt TẤT CẢ exception, kể cả lỗi không mong đợi
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // Xác định status code
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // Xác định message lỗi
    let message: string | object = 'Lỗi máy chủ nội bộ';
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : res;
    }

    // Log lỗi 500 để debug
    if (status >= 500) {
      this.logger.error(
        `${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    // Trả về response lỗi chuẩn
    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
