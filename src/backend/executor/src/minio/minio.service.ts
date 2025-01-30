import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AppService } from '../app.service';
import { InjectMinio } from '../decorators/minio.decorator';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
	defaultBucket: string;

	constructor(@InjectMinio() private readonly client: Minio.Client,
							configService: ConfigService,
							@InjectPinoLogger(AppService.name) private readonly logger: PinoLogger) {
		this.defaultBucket = configService.get('MINIO_DEFAULT_BUCKETS').split(',')[0];
	}

	async uploadBuffer(filename: string, buffer: Uint8Array) {
		const bufferStream = new Readable();
		bufferStream.push(buffer);
		bufferStream.push(null);
		this.client.putObject(
			this.defaultBucket,
			filename,
			bufferStream,
		)
			.catch(e => this.logger.error(e))
			.then(() => this.logger.info('успешное сохранение файла в хранилище'));

	}

	async getDownloadUrl(filename: string, expires: number = 3600) {
		return await this.client.presignedUrl('GET', this.defaultBucket, filename, expires);
	}
}