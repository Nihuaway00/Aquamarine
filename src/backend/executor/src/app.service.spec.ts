import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { PageSizes, PDFDocument } from 'pdf-lib';

describe('App Service Unit Test', () => {
	let appService: AppService;
	beforeAll(async () => {
		const module = await Test.createTestingModule({
			providers: [
				AppService,
			],
		}).compile();
		appService = module.get<AppService>(AppService);
	});

	it('Успешное удаление страницы из файла', async () => {
		const pdfExample = await PDFDocument.create();
		pdfExample.addPage(PageSizes.A1);
		pdfExample.addPage(PageSizes.A2);
		expect(pdfExample.getPages().length).toBe(2);
		const bufferExample = await pdfExample.save();

		const result = await appService.removePages(Buffer.from(bufferExample), [1]);
		const bufferResult = Buffer.from(result);

		const pdfResult = await PDFDocument.load(bufferResult);
		expect(pdfResult.getPages().length).toBe(1);
		expect(pdfResult.getPage(0).getSize().width).toBe(PageSizes.A2[0]);
	});

	it('Ошибка при неверном указании хотя бы одной страницы', async () => {
		const pdfExample = await PDFDocument.create();
		const bufferExample = await pdfExample.save();

		const incorrectTask = async () => await appService.removePages(Buffer.from(bufferExample), [1,3,0,5]);
		await expect(incorrectTask).rejects.toThrow();
	});
});