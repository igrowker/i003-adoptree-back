import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import {
	httpRequestCounterProvider,
	httpRequestDurationHistogramProvider,
} from './injector/metrics.injector';
import { MetricsService } from './metrics.service';
import { PrometheusControllers } from './metrics.controller';

@Module({
	imports: [
		PrometheusModule.register({
			controller: PrometheusControllers,
		}),
	],
	providers: [
		MetricsService,
		httpRequestCounterProvider,
		httpRequestDurationHistogramProvider,
	],
	exports: [MetricsService],
})
export class PrometheusCustomModule {}
