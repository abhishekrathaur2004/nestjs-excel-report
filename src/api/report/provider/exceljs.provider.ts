import * as ExcelJS from 'exceljs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExcelJsProvider {
  async createWorkbook(data: {
    sheetName: string;
    columns: string[];
    rows: Record<string, any>[];
  }) {
    const workbook = new ExcelJS.Workbook();

    // Add worksheet
    const worksheet = workbook.addWorksheet(data.sheetName);

    // Add columns with keys
    worksheet.columns = data.columns.map((column) => ({
      header: column,
      key: column, // IMPORTANT: key must match row object keys
      width: 20, // optional but recommended
      font: {
        name: 'Arial',
        size: 12,
        bold: true,
      },
    }));

    // Add rows
    worksheet.addRows(data.rows);

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();

    return buffer;
  }
}
