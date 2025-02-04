import {
	BadRequestException,
	Body,
	Controller,
	Headers,
	HttpCode,
	HttpStatus,
	ParseFilePipeBuilder,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { PdfService } from './pdf.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RemovePagesRequestDto } from './dto/remove-pages.request.dto';

@Controller('pdf')
export class PdfController {
	constructor(
		private readonly service: PdfService,
		@InjectPinoLogger(PdfController.name) private readonly logger: PinoLogger,
	) {}

	@Post('page/remove')
	@UseInterceptors(FileInterceptor('file'))
	@HttpCode(HttpStatus.OK)
	async removePages(
		@Headers('host') host: string,
		@Headers('x-forwarded-proto') protocol: string,
		@Body() body: RemovePagesRequestDto,
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
		this.logger.info(
			`Загружен файл: ${file.originalname}. Будут удалены страницы: ${body.pagesToRemove}`,
		);

		const parsed = body.pagesToRemove.split(',').map((num) => parseInt(num));
		const isValid = parsed.every((num) => num > 0 && Number.isInteger(num));

		if (!isValid)
			throw new BadRequestException('Неверный формат страниц для удаления');

		const url = await this.service.removePage(
			file.originalname,
			file.buffer,
			parsed,
		);
		return `${protocol}://${host}/storage${url}`;
	}
}
