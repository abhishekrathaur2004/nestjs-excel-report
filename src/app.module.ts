import { Module } from '@nestjs/common';
import { MediaUploadModule } from './api/media-upload/media-upload.module';
import { ReportModule } from './api/report/report.module';

@Module({
  imports: [ReportModule, MediaUploadModule],
})
export class AppModule {}
