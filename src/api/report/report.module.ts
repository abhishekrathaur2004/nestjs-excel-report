import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { MediaUploadModule } from '../media-upload/media-upload.module';
import { ExcelJsProvider } from './provider/exceljs.provider';

@Module({
  imports: [MediaUploadModule],
  controllers: [ReportController],
  providers: [ReportService, ExcelJsProvider],
})
export class ReportModule {}
