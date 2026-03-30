import { Injectable } from '@nestjs/common';
import { MediaUploadService } from '../media-upload/media-upload.service';
import { ExcelJsProvider } from './provider/exceljs.provider';
import { randomData } from './utils/random-data';

@Injectable()
export class ReportService {
  constructor(
    private readonly mediaUploadService: MediaUploadService,
    private readonly excelJsProvider: ExcelJsProvider,
  ) {}

  async generateExcel() {
    const data = randomData;
    const buffer = await this.excelJsProvider.createWorkbook(data);
    const fileUrl = await this.mediaUploadService.upload({
      key: 'report.xlsx',
      body: new Uint8Array(buffer),
      contentType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    return fileUrl;
  }
}
