import { Module } from '@nestjs/common';
import { PdfModule } from './pdf/pdf.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		LoggerModule.forRoot({
			pinoHttp: [
				{
					name: 'producer',
					level: 'debug',
				},
				null,
			],
		}),
		PdfModule,
	],
})
export class AppModule {}
