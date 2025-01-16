import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
	let configService = new ConfigService();

	console.log(configService.get('RABBITMQ_QUEUE'));
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.RMQ,
			options: {
				urls: [`${configService.get('RABBITMQ_URL')}`],
				queue: `${configService.get('RABBITMQ_QUEUE')}`,
				queueOptions: { durable: false },
				prefetchCount: 1,

			},
		},
	);
	app.useLogger(app.get(Logger));
	await app.listen();
}

bootstrap();
