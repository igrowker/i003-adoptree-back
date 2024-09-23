import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArbolModule } from './modules/arbol/arbol.module';
import { AuthModule } from './modules/auth/auth.module';
import { CosechaModule } from './modules/cosecha/cosecha.module';
import { FincaModule } from './modules/finca/finca.module';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthConfig, AuthEnvSchema } from './modules/auth/auth.config';
import * as Joi from 'joi';
import { PrometheusCustomModule } from './modules/metrics/metrics.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MetricsInterceptor } from './modules/metrics/interceptor/prometheus.interceptor';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [AuthConfig],
			validationSchema: Joi.object({
				...AuthEnvSchema,
				// ... otras variables de entorno que puedas tener
			}),
		}),
		PrismaModule.forRoot({
			isGlobal: true,
			prismaServiceOptions: {
				prismaOptions: {
					log: [{ emit: 'event', level: 'query' }],
				},
			},
		}),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '60m' },
		}),
		UsersModule,
		AuthModule,
		ArbolModule,
		FincaModule,
		CosechaModule,
		PrometheusCustomModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		// Interceptor para prometheus
		{
			provide: APP_INTERCEPTOR,
			useClass: MetricsInterceptor,
		},
	],
})
export class AppModule {}
