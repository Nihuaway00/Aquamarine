import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RemovePagesDto } from './dto/removePages.dto';
import { SplitDocumentDto } from './dto/splitDocument.dto';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@MessagePattern('pdf/page/remove')
	async removePages(@Payload() data: RemovePagesDto) {
		return this.appService.removePages(Buffer.from(data.bytes), data.pagesToRemove);
	}

	// @MessagePattern('pdf/split')
	// async split(@Payload() data: SplitDocumentDto) {
	// 	return this.appService.splitDocument(Buffer.from(data.bytes), data.slices);
	// }
}
