import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { MinioModule } from './minio/minio.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		LoggerModule,
		MinioModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
