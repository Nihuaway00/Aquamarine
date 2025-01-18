import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';

@Injectable()
export class AppService {
	async removePages(buffer: Buffer, pagesToRemove: number[]) {
		const pdfDoc = await PDFDocument.load(buffer);
		for (const page of pagesToRemove.sort((a, b) => b - a)) {
			pdfDoc.removePage(page - 1);
		}
		return await pdfDoc.save();
	}

	// async splitDocument(buffer: Buffer, slices: number[]) {
	// 	const pdfDoc = await PDFDocument.load(buffer);
	// 	const newDocs = [];
	//
	// 	// let i = 0;
	// 	// let newPdfDoc = await PDFDocument.create();
	// 	// for (const page of pdfDoc.getPages()) {
	// 	// 	i = i + 1;
	// 	// 	newPdfDoc.addPage(page);
	// 	// 	if (i === slices.shift()) {
	// 	// 		newDocs.push(newPdfDoc);
	// 	// 		newPdfDoc = await PDFDocument.create();
	// 	// 	}
	// 	// }
	// 	return Array.from({length: slices.length}, (_, i) => {
	// 		console.log(i);
	// 		return buffer;
	// 	})
	// }
}
