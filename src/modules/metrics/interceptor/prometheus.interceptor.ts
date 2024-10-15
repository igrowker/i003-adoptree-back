import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { MetricsService } from "../metrics.service";

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const path = req.route ? req.route.path : req.url;

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = (Date.now() - start) / 1000;
        const status = context
          .switchToHttp()
          .getResponse()
          .statusCode.toString();

        // Incrementa el contador de solicitudes HTTP
        this.metricsService.incrementHttpRequests(method, path, status);

        // Registra la duración en el histograma
        this.metricsService.observeHttpRequestDuration(method, path, duration);
      }),
    );
  }
}
