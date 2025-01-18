import { Module } from '@nestjs/common';
import { LoggerModule as pinoLogger } from 'nestjs-pino/LoggerModule';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule,
		pinoLogger.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
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
		})],
})
export class LoggerModule {
}
