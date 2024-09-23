import {
	makeCounterProvider,
	makeHistogramProvider,
} from '@willsoto/nestjs-prometheus';

// Crea un histograma para la duración de las solicitudes HTTP
export const httpRequestDurationHistogramProvider = makeHistogramProvider({
	name: 'http_request_duration_seconds',
	help: 'Duration of HTTP requests in seconds',
	labelNames: ['method', 'path'],
	buckets: [0.1, 0.5, 1, 3, 5],
});

// Crea un contador para la cantidad de solicitudes HTTP
export const httpRequestCounterProvider = makeCounterProvider({
	name: 'http_requests_total',
	help: 'Total number of HTTP requests',
	labelNames: ['method', 'path', 'status'],
});
