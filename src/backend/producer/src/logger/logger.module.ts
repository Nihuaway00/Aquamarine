import { Module } from '@nestjs/common';
import { LoggerModule as pinoLogger } from 'nestjs-pino/LoggerModule';

@Module({
	imports: [
		pinoLogger.forRootAsync({
			useFactory: () => ({
				pinoHttp: [
					{
						name: 'producer',
						level: 'debug',
						transport: {
							target: 'pino-pretty',
							options: {
								colorize: true,
							},
						},
					},
					null,
				],
			}),
		}),
	],
})
export class LoggerModule {}
