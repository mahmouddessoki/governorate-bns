import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
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
import { ActivatedRoute } from '@angular/router';
export enum SectorTypes {
  Population = 1,
  families_count = 2,
  Births = 3,
  Banks = 4,
}
@Component({
  selector: 'app-display-data',
  imports: [SectionHeaderComponent, ChartDataComponent, BarChartComponent],
  templateUrl: './display-data.component.html',
  styleUrl: './display-data.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DisplayDataComponent implements OnInit {
  private ngZone = inject(NgZone);
  private readonly activatedRoute = inject(ActivatedRoute);
  // ---- INPUT -------------------------------------------------
  subId = input<number>(0);
  pageType = input<string>('');
  centersId = signal<number>(0);

  // All Centers Data for Bar Chart
  allCentersData: any[] = [];
  chartLabels = signal<string[]>([]);
  chartSeries = signal<any[]>([]);

  // All Local Units Data for Bar Chart

  localUnitsData: any[] = [];
  // Chart Title
  chartTitle = signal<string>('');
  // Names for Dropdowns
  centersNames: string = 'المراكز';
  localUnitsNames: string = 'الوحدات المحلية';
  governoratesRes: any;
  barChartData: any;

  constructor(private chartDataService: ChartDataService) {
    this.activatedRoute.paramMap.subscribe((params) => {
      const subId = Number(params.get('subId'));

      console.log('subId =', subId);
    });
  }
  ngOnInit(): void {
    // this.fetchChartData();
    this.getPageType();

    this.chartTitle.set('محافظة بني سويف');
    this.getApiById(this.subId());
  }

  get pageTitle() {
    return this.getPageType();
  }

  getPageType() {
    return this.chartDataService.pageType();
  }

  // استرجاع بيانات الرسم البياني

  // تحديد الـ API حسب النوع
  getApiById(id: number, centerId?: number, localUnitId?: number) {
    const sectorId = Number(id);

    switch (sectorId) {
      case SectorTypes.Population:
        this.fetchChartData(centerId, localUnitId);
        break;

      case SectorTypes.families_count:
        this.getFamiliesCount(centerId, localUnitId);
        break;

      default:
        console.error('Unknown sector ID:', id);
        break;
    }
  }

  fetchChartData(centerId?: number, localUnitId?: number): void {
    this.chartDataService
      .getChartData(centerId, localUnitId)
      .subscribe((res) => {
        if (res) {
          const centers = res.allCentersData;
          this.chartLabels.set(centers.map((c: any) => c.name));
          this.chartSeries.set([
            {
              name: 'ذكور',
              data: centers.map((c: any) => Number(c.male) ?? 0),
              color: '#8DDCFE',
            },
            {
              name: 'إناث',
              data: centers.map((c: any) => Number(c.female) ?? 0),
              color: '#F3B0F9',
            },
          ]);
          this.allCentersData = centers;
          this.governoratesRes = res.governoratesData;
          this.governoratesRes = [
            {
              label: ' ذكور',
              value: Number(res.governoratesData[0].male) ?? 0,
              color: '#8DDCFE',
            },
            {
              label: ' إناث',
              value: Number(res.governoratesData[0].female) ?? 0,
              color: '#F3B0F9',
            },
          ];
          // this.barChartData = res.barChartData;
          console.log('Fetched Chart Data:', this.governoratesRes);
          // this.governoratesRes = res.governoratesData;
          // this.barChartData = res.barChartData;

          centerId ? (this.localUnitsData = res.barChartData) : [];
        }
      });
  }

  getFamiliesCount(centerId?: number, localUnitId?: number): void {
    this.chartDataService
      .getFamiliesCount(centerId, localUnitId)
      .subscribe((res: any) => {
        if (res) {
          const centers = res.allCentersData;
          this.chartLabels.set(centers.map((c: any) => c.name));
          this.chartSeries.set([
            {
              name: 'عدد الاسر',
              data: centers.map((c: any) => Number(c.families_count) ?? 0),
              color: '#8DDCFE',
            },
          ]);
          this.allCentersData = centers;
          console.log('Fetched Families Count Data:', this.allCentersData);
          this.governoratesRes = res.governoratesData;
          console.log('Fetched Chart Data:', this.governoratesRes);
          this.governoratesRes = [
            {
              label: 'عدد الأسر',
              value: Number(res.governoratesData[0].families_count) ?? 0,
              color: '#6EE7B7',
            },
          ];
          // this.barChartData = res.barChartData;
          console.log('Fetched Chart Data:', this.governoratesRes);
          // // console.log('Fetched Chart Data:', this.barChartData);
          // // console.log('res Chart Data:', res);
          centerId ? (this.localUnitsData = res.barChartData) : [];
          // this.allCentersData = res.allCentersData;
        }
      });
  }

  // استرجاع البيانات عند اختيار مركز أو وحدة محلية

  centersName(centerId: number, name: string): void {
    this.ngZone.run(() => {
      this.centersNames = name;
      this.chartTitle.set(name);
      this.getApiById(this.subId(), centerId);
      this.centersId.set(centerId);
      this.localUnitsNames = 'الوحدات المحلية';
    });
  }

  // استرجاع البيانات عند اختيار وحدة محلية
  localUnitsName(id: number, name: string): void {
    this.ngZone.run(() => {
      this.localUnitsNames = name;
      this.chartTitle.set(name);
      this.getApiById(this.subId(), this.centersId(), id);
    });
  }

  // إعادة تعيين البيانات إلى الحالة الافتراضية
  resetData(): void {
    this.centersNames = 'المراكز';
    this.localUnitsNames = 'الوحدات المحلية';
    this.getApiById(this.subId());
  }
}
