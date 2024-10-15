import { Controller, Get, Res } from '@nestjs/common';
import { PrometheusController } from '@willsoto/nestjs-prometheus';

@Controller('metrics')
export class PrometheusControllers extends PrometheusController {
	@Get()
	async index(@Res({ passthrough: true }) response: Response) {
		if (process.env.NODE_ENV === 'production') {
			return super.index(response);
		}
		return 'Metrics are only available in production';
	}
}
