import { Module } from '@nestjs/common';
import { PdfModule } from './pdf/pdf.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), LoggerModule, PdfModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
