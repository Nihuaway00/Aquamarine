import { Inject, Injectable } from '@nestjs/common';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Client } from 'minio';
import { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AppService } from '../app.service';

@Injectable()
export class MinioService {
	defaultBucket: string;

	constructor(@Inject(MINIO_CONNECTION) private readonly minioClient: Client,
							configService: ConfigService,
							@InjectPinoLogger(AppService.name) private readonly logger: PinoLogger) {
		this.defaultBucket = configService.get('MINIO_DEFAULT_BUCKETS').split(',')[0];
	}

	async uploadBuffer(filename: string, buffer: Uint8Array) {
		const bufferStream = new Readable();
		bufferStream.push(buffer);
		bufferStream.push(null);
		this.minioClient.putObject(
			this.defaultBucket,
			filename,
			bufferStream,
		)
			.catch(e => this.logger.error(e))
			.finally(() => this.logger.info('успешное сохранение файла в хранилище'));

	}

	async getDownloadUrl(filename: string) {
		return await this.minioClient.presignedGetObject(this.defaultBucket, filename, 60 * 60);
	}
}