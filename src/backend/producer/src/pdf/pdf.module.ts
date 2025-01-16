import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'executor',
				imports: [ConfigModule],
				useFactory: (configService: ConfigService) => ({
					transport: Transport.RMQ,
					options: {
						urls: [`${configService.get('RABBITMQ_URL')}`],
						queue: `${configService.get('RABBITMQ_QUEUE')}`,
						noAck: true,
						queueOptions: {
							durable: false,
						},
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
	controllers: [PdfController],
	providers: [PdfService],
})
export class PdfModule {}
