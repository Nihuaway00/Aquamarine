import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Inject,
	ParseFilePipeBuilder,
	Post,
	Res,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { PdfService } from './pdf.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RemovePagesDto } from './dto/removePages.dto';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Controller('pdf')
export class PdfController {
	constructor(
		private readonly pdfService: PdfService,
		@InjectPinoLogger(PdfController.name) private readonly logger: PinoLogger,
		@Inject('executor') private readonly executor: ClientProxy,
	) {}

	@Post('page/remove')
	@UseInterceptors(FileInterceptor('file'))
	@HttpCode(HttpStatus.OK)
	async removePages(
		// @Res() res,
		@Body() body,
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({
					fileType: 'application/pdf',
				})
				.build({
					fileIsRequired: true,
				}),
		)
		file: Express.Multer.File,
	) {
		this.logger.info(`Загружен файл: ${file.originalname}`);
		const data = new RemovePagesDto();
		data.filename = file.originalname;
		data.pagesToRemove = JSON.parse(body.pagesToRemove);
		data.bytes = file.buffer;

		this.logger.info('отправлена задача pdf/page/remove');
		const q = await firstValueFrom(this.executor.send('pdf/page/remove', data));
		this.logger.info(`получен ответ от executor: ${q}`);
		return q;
		// const o = Object.values(q);

		// const t = Uint8Array.from(o);
		// Создание потока Readable
		// const readableStream = new Readable();
		// readableStream.push(t);
		// readableStream.push(null);

		// res.setHeader('Content-Type', 'application/pdf');
		// res.setHeader('Content-Disposition', 'attachment; filename=removed.pdf');
		// res.setHeader('Content-Length', t.length);
		// readableStream.pipe(res);
	}

	// @Post('split')
	// @UseInterceptors(FileInterceptor('file'))
	// @HttpCode(HttpStatus.OK)
	// async splitDocument(
	// 	@Query('slices') slices: string,
	// 	@UploadedFile(
	// 		new ParseFilePipeBuilder()
	// 			.addFileTypeValidator({
	// 				fileType: 'application/pdf',
	// 			})
	// 			.build({
	// 				fileIsRequired: true,
	// 			}),
	// 	)
	// 	file?: Express.Multer.File,
	// ) {
	// 	const data = new SplitDocumentDto();
	// 	data.slices = slices
	// 		.split(',')
	// 		.map((x) => parseInt(x))
	// 		.filter((x) => x > 0);
	//
	// 	data.bytes = file.buffer;
	// 	const q = await firstValueFrom(this.executor.send('pdf/split', data));
	//
	// 	return q;
	// }
}
