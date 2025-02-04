import { PdfController } from './pdf.controller';
import { Test } from '@nestjs/testing';
import { Express } from 'express';
import { PdfService } from './pdf.service';
import { BadRequestException } from '@nestjs/common';

describe('pdf controller', () => {
	let controller: PdfController;
	const fileExmaple: Express.Multer.File = {
		originalname: 'file.pdf',
		buffer: Buffer.from(''),
		fieldname: 'file',
		encoding: '7bit',
		mimetype: 'application/pdf',
		size: 0,
		stream: undefined,
		destination: '',
		filename: '',
		path: '',
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [PdfController],
			providers: [
				{
					provide: PdfService,
					useValue: {
						removePage: jest.fn(() => '/example'),
					},
				},
				{
					provide: 'PinoLogger:PdfController',
					useValue: {
						info: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<PdfController>(PdfController);
	});

	it('успешное удаление страницы', async () => {
		const body = {
			pagesToRemove: '1,2,3',
		};
		const protocol = 'http';
		const host = 'localhost';

		const url = await controller.removePages(host, protocol, body, fileExmaple);
		expect(url).toBe(`${protocol}://${host}/storage/example`);
	});

	it('неверный формат страниц для удаления', async () => {
		const protocol = 'http';
		const host = 'localhost';

		await expect(
			controller.removePages(
				host,
				protocol,
				{ pagesToRemove: '1,2,' },
				fileExmaple,
			),
		).rejects.toThrow(BadRequestException);

		await expect(
			controller.removePages(
				host,
				protocol,
				{ pagesToRemove: '1,2, -58, 3' },
				fileExmaple,
			),
		).rejects.toThrow(BadRequestException);
	});
});
