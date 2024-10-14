import {
	Controller,
	Get,
	Header,
	MethodNotAllowedException,
} from '@nestjs/common';
import { Registry, collectDefaultMetrics } from 'prom-client';

@Controller('metrics')
export class PrometheusController {
	private readonly registry: Registry;

	constructor() {
		this.registry = new Registry();
		collectDefaultMetrics({ register: this.registry });
	}

	@Get()
	@Header('Content-Type', 'text/plain; version=0.0.4')
	async getMetrics(): Promise<string> {
		// Solamente disponible en producción
		if (process.env.NODE_ENV === 'production') {
			return await this.registry.metrics();
		}
		throw new MethodNotAllowedException('Only available in production');
	}
}
