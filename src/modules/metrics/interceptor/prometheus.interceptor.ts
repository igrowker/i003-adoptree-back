import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsService } from '../metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
	constructor(private readonly metricsService: MetricsService) {
		console.log('MetricsInterceptor initialized');
	}

	logg = new Logger('MetricsInterceptor');
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const req = context.switchToHttp().getRequest();
		const method = req.method;
		const path = req.route ? req.route.path : req.url;
		this.logg.log(`HTTP Method: ${method}, Path: ${path}`);
		const start = Date.now();
		this.logg.log(`Request started at: ${start}`);
		return next.handle().pipe(
			tap(() => {
				const duration = (Date.now() - start) / 1000;
				const status = context
					.switchToHttp()
					.getResponse()
					.statusCode.toString();
				this.logg.log(
					`Request duration: ${duration} seconds, HTTP Status: ${status}`
				);

				console.log('Calling metricsService.incrementHttpRequests');
				// Incrementa el contador de solicitudes HTTP
				this.metricsService.incrementHttpRequests(method, path, status);

				console.log(
					'Calling metricsService.observeHttpRequestDuration'
				);
				// Registra la duración en el histograma
				this.metricsService.observeHttpRequestDuration(
					method,
					path,
					duration
				);
			})
		);
	}
}
