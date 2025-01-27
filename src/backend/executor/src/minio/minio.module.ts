import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { MINIO_TOKEN } from '../decorators/minio.decorator';
import { MinioService } from './minio.service';


@Global()
@Module({
	exports: [MINIO_TOKEN, MinioService],
	providers: [
		{
			inject: [ConfigService],
			provide: MINIO_TOKEN,
			useFactory: async (
				configService: ConfigService,
			): Promise<Minio.Client> => {
				const client = new Minio.Client({
					endPoint: configService.getOrThrow('MINIO_SERVER_HOST'),
					port: +configService.getOrThrow('MINIO_PORT'),
					accessKey: configService.getOrThrow('MINIO_ACCESS_KEY'),
					secretKey: configService.getOrThrow('MINIO_SECRET_KEY'),
					useSSL: false,
					s3AccelerateEndpoint: 'true',
				});
				return client;
			},
		},
		MinioService,
	],
})
export class MinioModule {
}