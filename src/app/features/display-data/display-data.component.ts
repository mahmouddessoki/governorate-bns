import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SectionHeaderComponent } from "../../shared/components/ui/section-header/section-header.component";
import { ChartDataComponent } from "../../shared/components/ui/chart-data/chart-data.component";
import { BarChartComponent } from "../../shared/components/ui/bar-chart/bar-chart.component";

@Component({
  selector: 'app-display-data',
  imports: [SectionHeaderComponent, ChartDataComponent, BarChartComponent],
  templateUrl: './display-data.component.html',
  styleUrl: './display-data.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DisplayDataComponent {

}
