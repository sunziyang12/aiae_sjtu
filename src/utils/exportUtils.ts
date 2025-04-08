import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * 导出工具类
 * 提供Excel和PDF导出功能
 */
export class ExportUtils {
  /**
   * 导出为Excel文件
   * @param data 要导出的数据
   * @param fileName 文件名
   * @param sheetName 工作表名称
   */
  static exportToExcel(data: any[], fileName: string, sheetName: string = 'Sheet1'): void {
    // 创建工作簿
    const workbook = XLSX.utils.book_new();

    // 创建工作表
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 将工作表添加到工作簿
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // 生成Excel文件
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // 创建Blob对象
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // 保存文件
    saveAs(blob, `${fileName}.xlsx`);
  }

  /**
   * 导出为PDF文件
   * @param data 要导出的数据
   * @param fileName 文件名
   * @param title 标题
   * @param columns 列定义
   */
  static exportToPDF(
    data: any[],
    fileName: string,
    title: string,
    columns: { header: string; dataKey: string }[]
  ): void {
    // 创建PDF文档
    const doc = new jsPDF();

    // 添加标题
    doc.setFontSize(16);
    doc.text(title, 14, 15);

    // 添加表格
    (doc as any).autoTable({
      head: [columns.map(col => col.header)],
      body: data.map(item => columns.map(col => item[col.dataKey])),
      startY: 25,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] }
    });

    // 保存文件
    doc.save(`${fileName}.pdf`);
  }

  /**
   * 导出资源数据为Excel
   * @param resources 资源数据
   * @param resourceType 资源类型
   */
  static exportResourcesToExcel(resources: any, resourceType: string): void {
    let data: any[] = [];
    let fileName = '';

    switch (resourceType) {
      case 'projects':
        data = resources.projects.recentProjects.map((project: any) => ({
          '项目名称': project.name,
          '状态': project.status
        }));
        fileName = '项目资源';
        break;
      case 'talents':
        data = resources.talents.topTalents.map((talent: any) => ({
          '人才姓名': talent.name,
          '领域': talent.field
        }));
        fileName = '人才资源';
        break;
      case 'investors':
        data = resources.investors.activeInvestors.map((investor: any) => ({
          '投资者名称': investor.name,
          '类型': investor.type
        }));
        fileName = '投资者资源';
        break;
      case 'labs':
        data = resources.labs.activeProjects.map((project: any) => ({
          '项目名称': project.name,
          '使用率': project.usage
        }));
        fileName = '实验资源';
        break;
      default:
        return;
    }

    this.exportToExcel(data, fileName);
  }

  /**
   * 导出资源数据为PDF
   * @param resources 资源数据
   * @param resourceType 资源类型
   */
  static exportResourcesToPDF(resources: any, resourceType: string): void {
    let data: any[] = [];
    let fileName = '';
    let title = '';
    let columns: { header: string; dataKey: string }[] = [];

    switch (resourceType) {
      case 'projects':
        data = resources.projects.recentProjects;
        fileName = '项目资源';
        title = '项目资源列表';
        columns = [
          { header: '项目名称', dataKey: 'name' },
          { header: '状态', dataKey: 'status' }
        ];
        break;
      case 'talents':
        data = resources.talents.topTalents;
        fileName = '人才资源';
        title = '人才资源列表';
        columns = [
          { header: '人才姓名', dataKey: 'name' },
          { header: '领域', dataKey: 'field' }
        ];
        break;
      case 'investors':
        data = resources.investors.activeInvestors;
        fileName = '投资者资源';
        title = '投资者资源列表';
        columns = [
          { header: '投资者名称', dataKey: 'name' },
          { header: '类型', dataKey: 'type' }
        ];
        break;
      case 'labs':
        data = resources.labs.activeProjects;
        fileName = '实验资源';
        title = '实验资源列表';
        columns = [
          { header: '项目名称', dataKey: 'name' },
          { header: '使用率', dataKey: 'usage' }
        ];
        break;
      default:
        return;
    }

    this.exportToPDF(data, fileName, title, columns);
  }
} 