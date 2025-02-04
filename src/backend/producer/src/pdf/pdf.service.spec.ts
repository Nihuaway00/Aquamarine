import { PdfService } from './pdf.service';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

describe('pdf service', () => {
	let service: PdfService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PdfService,
				{
					provide: 'executor',
					useValue: {
						send: jest.fn(() => of('http://example')),
					},
				},
				{
					provide: 'PinoLogger:PdfService',
					useValue: {
						info: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<PdfService>(PdfService);
	});

	it('Успешное удаление страницы', async () => {
		const url = await service.removePage(
			'file.pdf',
			new Uint8Array(),
			[1, 2, 3],
		);
		expect(url).toBe('http://example');
	});
});
