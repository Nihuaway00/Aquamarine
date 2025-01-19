import { Inject, Injectable } from '@nestjs/common';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Client } from 'minio';
import { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioService {
	defaultBucket: string;

	constructor(@Inject(MINIO_CONNECTION) private readonly minioClient: Client, private readonly configService: ConfigService) {
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
		).catch(e => console.log(e));

	}

	async getDownloadUrl(filename: string) {
		return await this.minioClient.presignedGetObject(this.defaultBucket, filename, 60 * 60);
	}
}