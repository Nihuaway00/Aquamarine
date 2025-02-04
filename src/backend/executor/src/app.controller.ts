import { Controller, Req, Headers } from '@nestjs/common';
import {Request} from 'express';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RemovePagesDto } from './dto/removePages.dto';
import { MinioService } from './minio/minio.service';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService,
							private readonly minioService: MinioService,
							@InjectPinoLogger(AppController.name) private readonly logger: PinoLogger) {
	}

	@MessagePattern('pdf/page/remove')
	async removePages(@Payload() data: RemovePagesDto) {
		this.logger.info(`получена задача pdf/page/remove с данными: ${data.filename}, ${data.pagesToRemove}`);
		const buffer = await this.appService.removePages(Buffer.from(data.bytes), data.pagesToRemove);
		this.logger.info(`Из файла удалены страницы: ${data.pagesToRemove}`);
		await this.minioService.uploadBuffer(data.filename, buffer);

		const presignedUrl = await this.minioService.getDownloadUrl(data.filename);
		const match = presignedUrl.match(/^https?:\/\/[^\/]+(:\d+)?(\/.*)/);
		return match[2];
	}

	// @MessagePattern('pdf/split')
	// async split(@Payload() data: SplitDocumentDto) {
	// 	return this.appService.splitDocument(Buffer.from(data.bytes), data.slices);
	// }
}
