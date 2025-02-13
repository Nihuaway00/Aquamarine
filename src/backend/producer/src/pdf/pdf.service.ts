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

		const observable = this.executor.send('pdf/page/remove', data);
		this.logger.info(
			`отправлена задача pdf/page/remove : filename${data.filename}, pagesToRemove: ${data.pagesToRemove}, bytes: ${data.bytes.slice(0, 10)}`,
		);
		const url = await firstValueFrom(observable);
		this.logger.info(`Получена ссылка на скачивание: ${url}`);
		return url;
	}
}
