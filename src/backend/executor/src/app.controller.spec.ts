import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { RemovePagesDto } from './dto/removePages.dto';
import { MinioService } from './minio/minio.service';

describe('App Controller Unit Test', () => {
	let appController: AppController;

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			controllers: [AppController],
			providers: [
				{
					provide: AppService,
					useValue: {
						removePages: async (buffer, n) => buffer,
					},
				},
				{
					provide: MinioService,
					useValue: {
						uploadBuffer: async (filename, buffer) => true,
						getDownloadUrl: async (filename) => 'http://minio/processed_files/blabla.pdf/?api=fkejfkewf&gg=ee'
					},
				},
				{
					provide: 'PinoLogger:AppController',
					useValue: {
						info: jest.fn()
					}
				}
			],
		}).compile();

		appController = module.get<AppController>(AppController);
	});

	it('Успешное удаление страницы и получение ссылки',async () => {
		const example = new RemovePagesDto();
		example.filename = 'blabla.pdf'
		example.pagesToRemove = [1]
		example.bytes = Uint8Array.from([1,2,3,4]);

		const url = await appController.removePages(example);
		expect(url).toBe('/processed_files/blabla.pdf/?api=fkejfkewf&gg=ee');
	})
});