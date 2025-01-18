import { Module } from '@nestjs/common';
import { LoggerModule as pinoLogger } from 'nestjs-pino/LoggerModule';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		pinoLogger.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				pinoHttp: [
					{
						name: 'Aquamarine-producer',
						level: 'debug',
						transport: {
							target: '@logtail/pino',
							options: {
								sourceToken: configService.get('LOGTAIL_TOKEN'),
							},
						},
					},
					null,
				],
			}),
			inject: [ConfigService],
		}),
	],
})
export class LoggerModule {}
