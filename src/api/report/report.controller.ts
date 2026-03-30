import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'report', version: '1' })
@ApiTags('Report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('excel')
  @ApiOperation({ summary: 'Download Excel report' })
  @ApiResponse({
    status: 200,
    description: 'Excel report downloaded successfully',
  })
  async downloadExcel() {
    const fileUrl = await this.reportService.generateExcel();
    return {
      url: fileUrl,
    };
  }
}
