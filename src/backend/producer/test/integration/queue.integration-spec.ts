import { RemovePagesDto } from '../../src/pdf/dto/remove-pages.dto';
import { Test } from '@nestjs/testing';
import {
	RabbitMQContainer,
	StartedRabbitMQContainer,
} from '@testcontainers/rabbitmq';
import { expect, it } from '@jest/globals';
import { PdfController } from '../../src/pdf/pdf.controller';
import { PdfService } from '../../src/pdf/pdf.service';
import { Readable } from 'stream';
import { Express } from 'express';
import { ClientsModule, Transport } from '@nestjs/microservices';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const amqp = require('amqplib');

describe('PdfController', () => {
	const QUEUE = 'test';
	let rabbitMQContainer: StartedRabbitMQContainer;
	let connection: any;
	let channel: any;
	let pdfController: PdfController;

	beforeAll(async () => {
		rabbitMQContainer = await new RabbitMQContainer().start();
		connection = await amqp.connect(rabbitMQContainer.getAmqpUrl());
		channel = await connection.createChannel();
		await channel.assertQueue(QUEUE, { durable: false });

		const module = await Test.createTestingModule({
			controllers: [PdfController],
			providers: [
				PdfService,
				{
					provide: 'PinoLogger:PdfService',
					useValue: {
						info: jest.fn(),
					},
				},
				{
					provide: 'PinoLogger:PdfController',
					useValue: {
						info: jest.fn(),
					},
				},
			],
			imports: [
				ClientsModule.register([
					{
						name: 'executor',
						transport: Transport.RMQ,
						options: {
							urls: [rabbitMQContainer.getAmqpUrl()],
							queue: QUEUE,
							queueOptions: { durable: false },
						},
					},
				]),
			],
		}).compile();

		pdfController = module.get<PdfController>(PdfController);
	}, 20_000);

	beforeEach(async () => {
		await channel.close();
		channel = await connection.createChannel();
		return channel.assertQueue(QUEUE, { durable: false });
	});

	afterAll(async () => {
		if (channel) await channel.close();
		if (connection) await connection.close();
		if (rabbitMQContainer) await rabbitMQContainer.stop();
	});

	it('тест запуска rabbitmq', async () => {
		channel.sendToQueue(QUEUE, Buffer.from('a'));

		await new Promise((resolve) => {
			channel.consume(
				QUEUE,
				(message) => {
					expect(message?.content.toString()).toEqual('a');
					resolve(true);
				},
				{ noAck: true },
			);
		});
	});

	it('успешное удаление страницы', async () => {
		const host = 'localhost';
		const protocol = 'http';
		const body = {
			pagesToRemove: '1,2,3',
		};
		const file: Express.Multer.File = {
			originalname: 'file.pdf',
			buffer: Buffer.from(''),
			fieldname: '',
			encoding: '',
			mimetype: '',
			size: 0,
			stream: new Readable(),
			destination: '',
			filename: '',
			path: '',
		};

		const data = new RemovePagesDto();

		data.filename = file.originalname;
		data.pagesToRemove = [1, 2, 3];
		data.bytes = file.buffer;

		await pdfController.removePages(host, protocol, body, file);

		return new Promise((resolve) => {
			channel.consume(
				QUEUE,
				(message) => {
					const pattern = JSON.parse(message?.content.toString()).pattern;
					expect(pattern).not.toBeNull();
					resolve(true);
				},
				{ noAck: true },
			);
		});
	}, 30_000);
});
