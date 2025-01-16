import { INestApplication } from '@nestjs/common';
import { PdfService } from '../src/pdf/pdf.service';
import { PdfModule } from '../src/pdf/pdf.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('PdfController (e2e)', () => {
	let app: INestApplication;
	const pdfService = {
		removePage: async (buffer, pageToRemove: number) => buffer,
	};

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [PdfModule],
		})
			.overrideProvider(PdfService)
			.useValue(pdfService)
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	it(`/POST file/page/remove`, async () => {
		const fileBuffer = Buffer.from('lfdlfkdl');

		return request(app.getHttpServer())
			.post('/pdf/page/remove')
			.attach('file', fileBuffer, {
				filename: 'file.pdf',
				contentType: 'application/pdf',
			})
			.expect(200)
			.expect({
				type: 'Buffer',
				data: Array.from(Uint8Array.from(fileBuffer)),
			});
	});

	afterAll(async () => {
		await app.close();
	});
});
