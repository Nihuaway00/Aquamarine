import { NestMinioModule } from 'nestjs-minio';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioService } from './minio.service';

@Module({
	imports: [
		ConfigModule,
		NestMinioModule.registerAsync(
			{
				imports: [ConfigModule],
				inject: [ConfigService],
				useFactory: (configService: ConfigService) => ({
					isGlobal: true,
					endPoint: configService.get('MINIO_SERVER_HOST'),
					port: 9000,
					useSSL: false,
					accessKey: configService.get('MINIO_SERVER_ACCESS_KEY'),
					secretKey: configService.get('MINIO_SERVER_SECRET_KEY'),
				}),
			}),
	],
	providers: [MinioService],
	exports: [MinioService],
})
export class MinioModule {
}