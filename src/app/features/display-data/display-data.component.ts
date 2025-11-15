import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  input,
  NgZone,
  OnInit,
  signal,
} from '@angular/core';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header.component';
import { ChartDataComponent } from '../../shared/components/ui/chart-data/chart-data.component';
import { BarChartComponent } from '../../shared/components/ui/bar-chart/bar-chart.component';
import { ChartDataService } from './service/chart-data.service';

@Component({
  selector: 'app-display-data',
  imports: [SectionHeaderComponent, ChartDataComponent, BarChartComponent],
  templateUrl: './display-data.component.html',
  styleUrl: './display-data.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DisplayDataComponent implements OnInit {
  private ngZone = inject(NgZone);
  // subSectorId = input<number, string>(0, {
  //   alias: 'id',
  //   transform: (value: string): number => {
  //     const num = Number(value);
  //     return isNaN(num) ? 0 : num;
  //   },
  // });
  centersId = signal<number>(0);
  // governorate Data for Beni Suef
  beniSuefData: any = signal([]);
  // All Centers Data for Bar Chart
  allCentersData: any[] = [];

  // All Local Units Data for Bar Chart

  localUnitsData: any[] = [];

  centersNames: string = 'المراكز';
  localUnitsNames: string = 'الوحدات المحلية';
  governoratesRes: any;
  barChartData: any;

  constructor(private chartDataService: ChartDataService) {}
  ngOnInit(): void {
    this.fetchChartData();
  }

  // استرجاع بيانات الرسم البياني

  fetchChartData(centerId?: number, localUnitId?: number): void {
    this.chartDataService
      .getChartData(centerId, localUnitId)
      .subscribe((res) => {
        if (res) {
          this.governoratesRes = res.governoratesData;
          this.barChartData = res.barChartData;
          console.log('Fetched Chart Data:', this.governoratesRes);
          console.log('Fetched Chart Data:', this.barChartData);
          console.log('res Chart Data:', res);
          centerId ? (this.localUnitsData = res.barChartData) : [];
          this.allCentersData = res.allCentersData;
        }
      });
  }

  // استرجاع البيانات عند اختيار مركز أو وحدة محلية

  centersName(id: number, name: string): void {
    this.ngZone.run(() => {
      this.centersNames = name;
      this.fetchChartData(id);
      this.centersId.set(id);
      this.localUnitsNames = 'الوحدات المحلية';
    });
  }

  // استرجاع البيانات عند اختيار وحدة محلية
  localUnitsName(id: number, name: string): void {
    this.ngZone.run(() => {
      this.localUnitsNames = name;
      this.fetchChartData(this.centersId(), id);
    });
  }

  // إعادة تعيين البيانات إلى الحالة الافتراضية
  resetData(): void {
    this.centersNames = 'المراكز';
    this.localUnitsNames = 'الوحدات المحلية';
    this.fetchChartData();
  }
}
