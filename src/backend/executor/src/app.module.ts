import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MinioModule } from './minio/minio.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		LoggerModule.forRoot({
			pinoHttp: [
				{
					name: 'executor',
					level: 'debug',
				},
				null,
			],
		}),
		MinioModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
