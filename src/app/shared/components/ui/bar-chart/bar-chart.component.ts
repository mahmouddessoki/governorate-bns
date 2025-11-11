import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
echarts.use([BarChart, GridComponent, CanvasRenderer]);
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgxEchartsDirective, CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  chartOption: EChartsOption = {
    title: {
      text: 'توزيع الذكور والإناث حسب المراكز - محافظة بني سويف',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
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
      data: [
        'بني سويف',
        'ناصر',
        'إهناسيا',
        'ببا',
        'سمسطا',
        'الفشن',
        'الواسطى',
      ],
      axisLabel: {
        color: '#fff',
        fontSize: 12,
        padding: 5,
      },
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
        data: [52000, 32000, 21000, 39000, 26000, 28000, 34000],
        itemStyle: {
          color: '#8DDCFE',
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: 'إناث',
        type: 'bar',
        data: [48000, 30000, 23000, 36000, 25000, 27000, 31000],
        itemStyle: {
          color: '#F3B0F9',
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };
}
