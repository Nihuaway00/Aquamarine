import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfService {
	async removePage(buffer, pageToRemove: number) {
		console.log(pageToRemove);
		return buffer;
	}

	async merge(bytes1, bytes2) {
		return bytes1 + bytes2;
	}

	async split(bytes: Uint8Array, page: number) {
		return bytes;
	}

	async compress(bytes: Uint8Array) {
		return bytes;
	}
}
