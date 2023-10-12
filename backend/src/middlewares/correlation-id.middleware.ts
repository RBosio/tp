import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';

export const CORRELATION_ID_HEADER = 'X-Correlation-Id'



@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const id = randomUUID()
    
    req[CORRELATION_ID_HEADER] = id

    res.set(CORRELATION_ID_HEADER, id)

    next();
  }
}
