import { Injectable, Logger } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class MetricsService {
	constructor(
		@InjectMetric('http_requests_total')
		private readonly httpRequestCounter: Counter<string>,
		@InjectMetric('http_request_duration_seconds')
		private readonly httpRequestDurationHistogram: Histogram<string>
	) {
		// Log para verificar que las métricas se inician
		console.log('Metrics initialized:', {
			httpRequestCounter: this.httpRequestCounter,
			httpRequestDurationHistogram: this.httpRequestDurationHistogram,
		});
	}
	logg = new Logger('MetricsService');

	// Metodo para incrementar el contador de solicitudes HTTP
	incrementHttpRequests(method: string, path: string, status: string) {
		this.logg.log('Incrementing http_requests_total for', {
			method,
			path,
			status,
		});
		this.httpRequestCounter.inc({ method, path, status });
	}
	// Metodo para registrar la duración de una solicitud HTTP
	observeHttpRequestDuration(method: string, path: string, duration: number) {
		this.logg.log('Observing http_request_duration_seconds for', {
			method,
			path,
			duration,
		});
		this.httpRequestDurationHistogram.observe({ method, path }, duration);
	}
}
