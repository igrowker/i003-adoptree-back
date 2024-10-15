import { Module } from "@nestjs/common";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { PrometheusController } from "./metrics.controller";
import {
  httpRequestCounterProvider,
  httpRequestDurationHistogramProvider,
} from "./injector/metrics.injector";
import { MetricsService } from "./metrics.service";

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  controllers: [PrometheusController],
  providers: [
    MetricsService,
    httpRequestDurationHistogramProvider,
    httpRequestCounterProvider,
  ],
  exports: [MetricsService],
})
export class PrometheusCustomModule {}
