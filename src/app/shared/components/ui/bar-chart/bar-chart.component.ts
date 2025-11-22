import { Component, effect, input, OnInit, signal } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';

// تسجيل الـ modules اللي محتاجها الرسم فقط
echarts.use([
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgxEchartsDirective, CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent implements OnInit {
  // 🟦 input signal (البيانات بتيجي من الأب)
  localUnitsData = input<
    { name: string; male: string | number; female: string | number }[]
  >([]);
  allCentersData = input<
    { name: string; male: string | number; female: string | number }[]
  >([]);

  ngOnInit(): void {
    // 🟩 effect: يتفاعل تلقائيًا عند أي تغيير في inpu
    console.log(
      'BarChartComponent initialized with data:',
      this.allCentersData()
    );
  }
  // 👇 labels = أسماء المراكز (strings)
  labels = input<string[]>([]);

  // 👇 series = شكل ديناميكي
  series = input<
    {
      name: string;
      data: (string | number)[];
      color?: string;
    }[]
  >([]);

  // 🟨 signal للـ chart option
  chartOption = signal<EChartsOption>({});

  constructor() {
    effect(() => {
      const data = this.allCentersData();
      console.log('%c📊 بيانات جديدة:', 'color: lime', data);
      this.updateChart(data);
      this.updateCharts();
    });
  }

  private updateCharts() {
    const labels = this.labels();
    const series = this.series();

    if (!labels.length || !series.length) {
      this.chartOption.set({
        title: {
          text: 'لا توجد بيانات',
          left: 'center',
          top: 'middle',
          textStyle: { color: '#fff', fontSize: 18 },
        },
      });
      return;
    }

    const option: EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: {
        bottom: 0,
        textStyle: { color: '#fff' },
      },
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: { color: '#fff', fontSize: 12 },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#fff' },
      },
      series: series.map((s) => ({
        name: s.name,
        type: 'bar',
        data: s.data,
        itemStyle: {
          color: s.color || undefined,
          borderRadius: [4, 4, 0, 0],
        },
      })),
    };

    this.chartOption.set(option);
  }

  private updateChart(data: any[] | undefined) {
    if (!data || data.length === 0) {
      this.chartOption.set({
        title: {
          text: 'لا توجد بيانات',
          left: 'center',
          top: 'middle',
          textStyle: { color: '#fff', fontSize: 18 },
        },
      });
      return;
    }

    // تجهيز البيانات للمخطط
    const centers = data.map((d) => d.name);
    const maleData = data.map((d) => this.safeParse(d.male) ?? 0);
    const femaleData = data.map((d) => this.safeParse(d.female) ?? 0);

    // بناء الـ option
    const option: EChartsOption = {
      backgroundColor: 'transparent',
      title: {
        text: 'توزيع الذكور والإناث حسب المراكز - محافظة بني سويف',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        bottom: 0,
        data: ['ذكور', 'إناث'],
        textStyle: { color: '#fff' },
      },
      grid: {
        top: 60,
        left: '3%',
        right: '4%',
        bottom: 50,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: centers,
        axisLabel: { color: '#fff', fontSize: 12, padding: 5 },
        axisLine: { lineStyle: { color: '#555' } },
      },
      yAxis: {
        type: 'value',
        name: 'عدد السكان',
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#555' } },
        splitLine: { lineStyle: { color: '#333' } },
      },
      series: [
        {
          name: 'ذكور',
          type: 'bar',
          data: maleData,
          itemStyle: { color: '#8DDCFE', borderRadius: [4, 4, 0, 0] },
          animationDuration: 800,
        },
        {
          name: 'إناث',
          type: 'bar',
          data: femaleData,
          itemStyle: { color: '#F3B0F9', borderRadius: [4, 4, 0, 0] },
          animationDuration: 800,
        },
      ],
    };

    // 🟢 تحديث الـ chart signal
    this.chartOption.set(option);
  }

  // 🔹 تحويل آمن لأي قيمة رقمية
  private safeParse(val: string | number | any): number | null {
    if (val === null || val === undefined) return null;
    const n = parseFloat(String(val).trim());
    return isNaN(n) ? null : n;
  }
}
