import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';

@Injectable()
export class AppService {
	async removePages(buffer: Buffer, pagesToRemove: number[]) {
		const pdfDoc = await PDFDocument.load(buffer);
		const sorted = pagesToRemove.sort((a, b) => b - a);
		const unique = new Set(sorted);
		const docPages = pdfDoc.getPages();

		const preparedToRemove = [...unique].filter((page) => page <= docPages.length);

		for (const page of preparedToRemove) {
			pdfDoc.removePage(page - 1);
		}
		return await pdfDoc.save();
	}
}
