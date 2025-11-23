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
import {
  CommonModule,
  NgClass,
} from '../../../../node_modules/@angular/common';
export enum SectorTypes {
  Population = 1,
  families_count = 2,
  ezba_count = 3,
  area_buildings_statistics = 4,
  age_group_statistics = 5,
  marital_status_statistics = 6,
  natural_increase = 7,
  education_statistics = 9,
}
@Component({
  selector: 'app-display-data',
  imports: [
    SectionHeaderComponent,
    ChartDataComponent,
    BarChartComponent,
    NgClass,
    CommonModule,
  ],
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
      case SectorTypes.ezba_count:
        this.getEzbaCount(centerId, localUnitId);
        break;

      case SectorTypes.natural_increase:
        this.getNaturalIncreaseRate(centerId, localUnitId);
        break;
      case SectorTypes.marital_status_statistics:
        this.getMaritalStatusStatistics(centerId, localUnitId);
        break;
      case SectorTypes.area_buildings_statistics:
        this.getAreaBuildingsStatistics(centerId, localUnitId);
        break;
      case SectorTypes.age_group_statistics:
        this.getAgeGroupStatistics(centerId, localUnitId);
        break;
      case SectorTypes.education_statistics:
        this.getEducationStatistics(centerId, localUnitId);
        break;

      default:
        console.error('Unknown sector ID:', id);
        break;
    }
  }

  // استرجاع بيانات السكان
  fetchChartData(centerId?: number, localUnitId?: number): void {
    this.chartDataService
      .getChartData(centerId, localUnitId)
      .subscribe((res) => {
        if (res) {
          const centers = centerId ? res.barChartData : res.allCentersData;
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
          console.log('Fetched Chart Data:', this.governoratesRes);

          centerId ? (this.localUnitsData = res.barChartData) : [];
        }
      });
  }

  // استرجاع عدد الأسر
  getFamiliesCount(centerId?: number, localUnitId?: number): void {
    this.chartDataService
      .getFamiliesCount(centerId, localUnitId)
      .subscribe((res: any) => {
        if (res) {
          const centers = centerId ? res.barChartData : res.allCentersData;
          this.chartLabels.set(centers.map((c: any) => c.name));
          this.chartSeries.set([
            {
              name: 'عدد الاسر',
              data: centers.map((c: any) => Number(c.families_count) ?? 0),
              color: '#8DDCFE',
            },
          ]);
          this.allCentersData = centers;
          this.governoratesRes = res.governoratesData;
          this.governoratesRes = [
            {
              label: 'عدد الأسر',
              value: Number(res.governoratesData[0].families_count) ?? 0,
              color: '#6EE7B7',
            },
          ];

          centerId ? (this.localUnitsData = res.barChartData) : [];
        }
      });
  }

  // استرجاع عدد العزب
  getEzbaCount(centerId?: number, localUnitId?: number): void {
    this.chartDataService
      .getEzbaCount(centerId, localUnitId)
      .subscribe((res: any) => {
        if (res) {
          const centers = centerId ? res.barChartData : res.allCentersData;
          this.chartLabels.set(centers.map((c: any) => c.name));
          this.chartSeries.set([
            {
              name: 'عدد العزب',
              data: centers.map((c: any) => Number(c.Ezab_count) ?? 0),
              color: '#8DDCFE',
            },
          ]);
          this.allCentersData = centers;
          this.governoratesRes = res.governoratesData;
          this.governoratesRes = [
            {
              label: 'عدد العزب',
              value: Number(res.governoratesData[0].Ezab_count) ?? 0,
              color: '#FBBF24',
            },
          ];

          centerId ? (this.localUnitsData = res.barChartData) : [];
        }
      });
  }

  // استرجاع عدد العزب
  getNaturalIncreaseRate(centerId?: number, localUnitId?: number): void {
    this.chartDataService
      .getNaturalIncreaseRate(centerId, localUnitId)
      .subscribe((res: any) => {
        if (res) {
          const centers = centerId ? res.barChartData : res.allCentersData;
          this.chartLabels.set(centers.map((c: any) => c.name));
          this.chartSeries.set([
            {
              name: 'عدد المواليد',
              data: centers.map(
                (c: any) => this.normalizeValue(c.birth_rate) ?? 0
              ),
              color: '#8DDCFE',
            },
            {
              name: 'عدد الوفيات',
              data: centers.map(
                (c: any) => this.normalizeValue(c.death_rate) ?? 0
              ),
              color: '#FBBF24',
            },
          ]);
          this.allCentersData = centers;
          this.governoratesRes = res.governoratesData;
          this.governoratesRes = [
            {
              label: 'عدد المواليد',
              value:
                this.normalizeValue(res.governoratesData[0].birth_rate) ?? 0,
              color: '#8DDCFE',
            },
            {
              label: 'عدد الوفيات',
              value:
                this.normalizeValue(res.governoratesData[0].death_rate) ?? 0,
              color: '#FBBF24',
            },
          ];

          centerId ? (this.localUnitsData = res.barChartData) : [];
        }
      });
  }

  // استرجاع إحصائيات الحالة الاجتماعية
  getMaritalStatusStatistics(centerId?: number, localUnitId?: number): void {
    this.chartDataService
      .getMaritalStatusStatistics(centerId, localUnitId)
      .subscribe((res: any) => {
        if (res) {
          const centers = centerId ? res.barChartData : res.allCentersData;

          this.chartLabels.set(centers.map((c: any) => c.name));
          const types = ['single', 'married', 'widowed', 'divorced'];
          const colors: any = {
            single: '#60A5FA',
            married: '#34D399',
            widowed: '#A78BFA',
            divorced: '#F472B6',
          };
          const status = res.governoratesData[0].marital_status_counts;

          const chartSeries = types.map((type) => ({
            name: status[type].label,
            data: centers.map((c: any) =>
              this.normalizeValue(c.marital_status_counts[type].count)
            ),
            color: colors[type],
          }));

          this.chartSeries.set(chartSeries);

          this.allCentersData = centers;
          const formatted = [
            {
              label: status.single.label,
              value: this.normalizeValue(status.single.count),
              color: colors.single,
            },
            {
              label: status.married.label,
              value: this.normalizeValue(status.married.count),
              color: colors.married,
            },
            {
              label: status.widowed.label,
              value: this.normalizeValue(status.widowed.count),
              color: colors.widowed,
            },
            {
              label: status.divorced.label,
              value: this.normalizeValue(status.divorced.count),
              color: colors.divorced,
            },
          ];

          this.governoratesRes = formatted;

          centerId ? (this.localUnitsData = res.barChartData) : [];
        }
      });
  }

  // استرجاع إحصائيات مباني المناطق
  getAreaBuildingsStatistics(centerId?: number, localUnitId?: number): void {
    this.chartDataService
      .getAreaBuildingsStatistics(centerId, localUnitId)
      .subscribe((res: any) => {
        if (res) {
          const centers = centerId ? res.barChartData : res.allCentersData;

          this.chartLabels.set(centers.map((c: any) => c.name));

          this.chartSeries.set([
            {
              name: 'إجمالي المساحة (كم²)',
              data: centers.map((c: any) =>
                this.normalizeValue(c.total_area_km2)
              ),
              color: '#60A5FA',
            },
            {
              name: 'عدد المباني',
              data: centers.map((c: any) =>
                this.normalizeValue(c.buildings_count)
              ),
              color: '#34D399',
            },
            {
              name: 'المساحة المزروعة (كم²)',
              data: centers.map((c: any) =>
                this.normalizeValue(c.cultivated_area_km2)
              ),
              color: '#FBBF24',
            },
          ]);

          this.allCentersData = centers;
          this.governoratesRes = res.governoratesData[0];

          this.governoratesRes = [
            {
              label: 'إجمالي المساحة (كم²)',
              value: this.normalizeValue(this.governoratesRes.total_area_km2),
              color: '#60A5FA',
            },
            {
              label: 'عدد المباني',
              value: this.normalizeValue(this.governoratesRes.buildings_count),
              color: '#34D399',
            },
            {
              label: 'المساحة المزروعة (كم²)',
              value: this.normalizeValue(
                this.governoratesRes.cultivated_area_km2
              ),
              color: '#FBBF24',
            },
          ];

          centerId ? (this.localUnitsData = res.barChartData) : [];
        }
      });
  }
  // استرجاع إحصائيات الفئات العمرية
  getAgeGroupStatistics(centerId?: number, localUnitId?: number): void {
    this.chartDataService
      .getAgeGroupStatistics(centerId, localUnitId)
      .subscribe((res: any) => {
        if (!res) return;

        const centers = centerId ? res.barChartData : res.allCentersData;

        const g = res.governoratesData?.[0];
        const governorateGroups = g?.detailed_age_groups || [];

        const refGroups =
          governorateGroups.length > 0
            ? governorateGroups
            : centers[0]?.detailed_age_groups || [];

        const ageRanges = refGroups.map((g: any) => g.age_range);
        this.chartLabels.set(ageRanges);

        const series = centers.map((center: any) => {
          const data = ageRanges.map((range: string) => {
            const found = center.detailed_age_groups.find(
              (item: any) => item.age_range === range
            );
            return this.normalizeValue(found?.count ?? 0);
          });

          return {
            name: center.name,
            data,
            color: undefined,
          };
        });

        this.chartSeries.set(series);

        this.governoratesRes = refGroups.map((g: any) => ({
          label: g.age_range,
          value: this.normalizeValue(g.count),
          color: undefined,
        }));

        this.allCentersData = centers;
        centerId ? (this.localUnitsData = res.barChartData) : [];
      });
  }

  // استرجاع إحصائيات التعليم
  getEducationStatistics(centerId?: number, localUnitId?: number): void {
    this.chartDataService
      .getEducationStatistics(centerId, localUnitId)
      .subscribe((res: any) => {
        if (!res) return;

        const centers = centerId ? res.barChartData : res.allCentersData;

        const g = res.governoratesData?.[0];
        const governorateGroups = g?.detailed_education_levels || [];

        const refGroups =
          governorateGroups.length > 0
            ? governorateGroups
            : centers[0]?.detailed_education_levels || [];

        const educationLevels = refGroups.map((g: any) => g.level);
        this.chartLabels.set(educationLevels);

        const series = centers.map((center: any) => {
          const data = educationLevels.map((level: string) => {
            const found = center.detailed_education_levels.find(
              (item: any) => item.level === level
            );
            return this.normalizeValue(found?.count ?? 0);
          });

          return {
            name: center.name,
            data,
            color: undefined,
          };
        });

        this.chartSeries.set(series);

        this.governoratesRes = refGroups.map((g: any) => ({
          label: g.level,
          value: this.normalizeValue(g.count),
          color: undefined,
        }));
        this.allCentersData = res.allCentersData;
        this.localUnitsData = centerId ? res.barChartData : [];
      });
  }

  // تطبيع القيم الرقمية

  private normalizeValue(val: string | number): number {
    if (!val) return 0;
    return Number(String(val).replace(/[^\d.]/g, ''));
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
