import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	ParseFilePipeBuilder,
	Post,
	Query,
	Res,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { PdfService } from './pdf.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';
import { Readable } from 'stream';
import { firstValueFrom } from 'rxjs';
import { RemovePagesDto } from './dto/removePages.dto';

@Controller('pdf')
export class PdfController {
	constructor(
		private readonly pdfService: PdfService,
		@Inject('executor') private readonly executor: ClientProxy,
	) {}

	@Post('page/remove')
	@UseInterceptors(FileInterceptor('file'))
	@HttpCode(HttpStatus.OK)
	async removePages(
		@Res() res,
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
		file?: Express.Multer.File,
	) {
		const data = new RemovePagesDto();
		data.filename = file.filename;
		data.pagesToRemove = JSON.parse(body.pagesToRemove);
		data.bytes = file.buffer;

		const q = await firstValueFrom(this.executor.send('pdf/page/remove', data));
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
