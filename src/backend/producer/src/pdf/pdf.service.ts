import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RemovePagesDto } from './dto/remove-pages.dto';

@Injectable()
export class PdfService {
	constructor(
		@InjectPinoLogger(PdfService.name) private readonly logger: PinoLogger,
		@Inject('executor') private readonly executor: ClientProxy,
	) {}

	async removePage(
		filename: string,
		bytes: Uint8Array,
		pagesToRemove: number[],
	) {
		const data = new RemovePagesDto();

		data.filename = filename;
		data.pagesToRemove = pagesToRemove;
		data.bytes = bytes;

		this.logger.info('отправлена задача pdf/page/remove');
		const url = await firstValueFrom(
			this.executor.send('pdf/page/remove', data),
		);
		this.logger.info(`Получена ссылка на скачивание: ${url}`);
		return url;
	}
}
