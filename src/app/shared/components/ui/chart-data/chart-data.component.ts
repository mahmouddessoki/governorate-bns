import { Component, effect, input, signal } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts'; // ✅ استخدم PieChart بدل BarChart
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { CommonModule } from '@angular/common';
import { EChartsOption } from 'echarts';

echarts.use([PieChart, GridComponent, CanvasRenderer]); // ✅ تحديث الاستخدام

@Component({
  selector: 'app-chart-data',
  imports: [NgxEchartsDirective, CommonModule],
  templateUrl: './chart-data.component.html',
  styleUrl: './chart-data.component.scss',
})
export class ChartDataComponent {
  // ---- INPUT -------------------------------------------------

  beniSuefData = input<any[]>([]);
  chartData = input<
    { label: string; value: number | string; color?: string }[]
  >([]);
  chartTitle = input<string>('');

  // ---- STATE -------------------------------------------------
  chartOption = signal<EChartsOption>({});

  // ---- EFFECT ------------------------------------------------
  constructor() {
    effect(() => {
      console.log('EFFECT تغير → ', this.chartData());
      console.log('EFFECT تغير → ', this.chartTitle());

      // this.updateChart(data);
      this.updateCharts(this.chartData());
    });
  }

  private updateCharts(data: any[] | undefined) {
    const option: EChartsOption = {
      backgroundColor: 'transparent',
      title: {
        text: this.chartTitle(),
        left: 'center',
        top: 10,
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
      },
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      legend: {
        orient: 'horizontal',
        bottom: -5,
        textStyle: { color: '#ccc' },
      },
      series: [],
    };

    if (!data || data.length === 0) {
      option.title = {
        text: 'لا توجد بيانات',
        left: 'center',
        top: 'middle',
        textStyle: { color: '#fff', fontSize: 18 },
      };
      this.chartOption.set(option);
      return;
    }

    option.series = [
      {
        name: 'data',
        type: 'pie',
        radius: ['50%', '75%'],

        label: {
          color: '#fff',

          formatter: '{b}: {c} ({d}%)',
        },
        data: data.map((item) => ({
          value: item.value,
          name: item.label,
          itemStyle: item.color ? { color: item.color } : {},
        })),
      },
    ];

    this.chartOption.set(option);
  }

  // ---- مساعدة لتحويل الأرقام بأمان -------------------------
  private safeParse(val: string | number | any): number | null {
    if (val === null || val === undefined) return null;
    const n = parseFloat(String(val).trim());
    return isNaN(n) ? null : n;
  }
}
