import { Inject, Injectable } from '@nestjs/common';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Client } from 'minio';
import { Readable } from 'stream';

@Injectable()
export class MinioService {
	constructor(@Inject(MINIO_CONNECTION) private readonly minioClient: Client) {
	}

	async uploadStream(bucket: string, filename: string, buffer: Uint8Array) {
		const bufferStream = new Readable();
		bufferStream.push(buffer);
		bufferStream.push(null);
		this.minioClient.putObject(
			bucket,
			filename,
			bufferStream,
		).catch(e => console.log(e));
	}
}