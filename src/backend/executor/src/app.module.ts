import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule as pinoLogger } from 'nestjs-pino';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
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
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
