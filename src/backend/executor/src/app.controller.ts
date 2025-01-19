import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RemovePagesDto } from './dto/removePages.dto';
import { MinioService } from './minio/minio.service';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

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
		return await this.minioService.getDownloadUrl(data.filename);
	}

	// @MessagePattern('pdf/split')
	// async split(@Payload() data: SplitDocumentDto) {
	// 	return this.appService.splitDocument(Buffer.from(data.bytes), data.slices);
	// }
}
