import { Component } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { CommonModule } from '@angular/common';
import { EChartsOption } from 'echarts';
echarts.use([BarChart, GridComponent, CanvasRenderer]);
@Component({
  selector: 'app-chart-data',
  imports: [NgxEchartsDirective, CommonModule],
  templateUrl: './chart-data.component.html',
  styleUrl: './chart-data.component.scss'
})
export class ChartDataComponent {
  chartOption: EChartsOption = {
    title: {

      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'horizontal',
      bottom: 10,
      textStyle: {
        color: '#ccc',
      },
    },
    series: [
      {
        name: 'Gender',
        type: 'pie',
        radius: ['50%', '75%'],
        avoidLabelOverlap: false,
        itemStyle: {
          // borderRadius: 8,
          // borderColor: '#0f172a',
          // borderWidth: 2,
        },
        label: {
          show: true,
          position: 'outside',
          color: '#fff',
          fontSize: 14,
        },
        labelLine: {
          show: true,
          smooth: true,
        },
        data: [
          { value: 640, name: 'Male', itemStyle: { color: '#8DDCFE' } },
          { value: 360, name: 'Female', itemStyle: { color: '#F3B0F9' } },
        ],
        emphasis: {
          scale: true,
          scaleSize: 10,
          itemStyle: {
            // shadowBlur: 10,
            shadowOffsetX: 0,
            // shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };



}
