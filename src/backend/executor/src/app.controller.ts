import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RemovePagesDto } from './dto/removePages.dto';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Client } from 'minio';
import { Readable } from 'stream';
import { MinioService } from './minio/minio.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private readonly minioService: MinioService) {
	}

	@MessagePattern('pdf/page/remove')
	async removePages(@Payload() data: RemovePagesDto) {
		const buffer = await this.appService.removePages(Buffer.from(data.bytes), data.pagesToRemove);
		await this.minioService.uploadBuffer('test','i.pdf',buffer);
		t
		return buffer;

	}

	// @MessagePattern('pdf/split')
	// async split(@Payload() data: SplitDocumentDto) {
	// 	return this.appService.splitDocument(Buffer.from(data.bytes), data.slices);
	// }
}
