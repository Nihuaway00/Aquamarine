import { Module } from '@nestjs/common';
import { LoggerModule as pinoLogger } from 'nestjs-pino/LoggerModule';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule,
		pinoLogger.forRootAsync({
			useFactory: () => ({
				pinoHttp: [
					{
						name: 'executor',
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
		})],
})
export class LoggerModule {
}
