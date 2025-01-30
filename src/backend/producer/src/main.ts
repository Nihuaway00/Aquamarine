import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
	const configService = new ConfigService();
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		credentials: false,
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type'],
	});
	app.useLogger(app.get(Logger));
	await app.listen(configService.get('PORT'));
}

bootstrap();
