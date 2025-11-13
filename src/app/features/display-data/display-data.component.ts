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
  subSectorId = input<number, string>(0, {
    alias: 'id',
    transform: (value: string): number => {
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    },
  });
  beniSuefData = signal<[{ male: number; female: number }]>([
    {
      male: 0,
      female: 0,
    },
  ]);
  allCentersData = signal<{ name: string; male: number; female: number }[]>([]);

  localUnitsData = signal<
    {
      id: number | null;
      name: string;
      male: number;
      female: number;
    }[]
  >([]);
  centersData = signal<[{ id: number; name: string }]>([
    {
      id: 0,
      name: '',
    },
  ]);
  localUnits = signal<[{ id: number; name: string }]>([
    {
      id: 0,
      name: '',
    },
  ]);
  centersNames: string = 'المراكز';
  localUnitsNames: string = 'الوحدات المحلية';

  constructor(private chartDataService: ChartDataService) {
    effect(() => {
      console.log('SubSector ID:', this.subSectorId());
    });
  }
  ngOnInit(): void {
    this.fetchChartData();
    this.fetchCenters();
    this.fetchLocalUnits();
  }

  fetchCenters(): void {
    this.chartDataService.getCenters().subscribe((res) => {
      this.centersData.set(res.data);
      console.log('Centers data:', this.centersData());
      console.log('Fetched centers:', res);
    });
  }

  fetchLocalUnits(): void {
    this.chartDataService.getLocalUnits().subscribe((res) => {
      this.localUnits.set(res.data);
      console.log('Local Units data:', this.localUnits());
      console.log('Fetched local units:', res);
    });
  }

  fetchChartData(
    subSectorId?: number,
    centerId?: number,
    localUnitId?: number
  ): void {
    this.chartDataService
      .getChartData(subSectorId, centerId, localUnitId)
      .subscribe((res) => {
        if (res.data) {
          this.allCentersData.set(res.data.centers_stats);
          this.beniSuefData.set([res.data.governorate_stats]);
          this.localUnitsData.set(res.data.local_units_stats);
          console.log('All Centers Data:', this.allCentersData());
          // this.updateLocalUnits(this.localUnitsData());

          console.log('Fetched chart data:', res);
        }
      });
  }
  // updateLocalUnits(data: any[]): void {
  //   // 🧩 دمج البيانات
  //   const merged = this.localUnitsData().map((unitData) => {
  //     const match = this.localUnits().find(
  //       (unit) => unit.name.trim() === unitData.name.trim()
  //     );
  //     return {
  //       ...unitData,
  //       id: match?.id ?? null,
  //     };
  //   });

  //   this.localUnitsData.set(merged);

  //   console.log('✅ Updated Local Units with IDs:', this.localUnitsData());
  // }

  retriveData(id: number, name: string): void {
    console.log('Local Unit ID:', id);
    console.log('Local Unit Name:', name);

    this.ngZone.run(() => {
      const foundCenter = this.centersData().find((c) => c.id === id);

      if (foundCenter) {
        this.centersNames = foundCenter.name;
        console.log('✅ Center Name:', this.centersNames);
        this.fetchChartData(this.subSectorId(), id);
        this.localUnitsNames = 'الوحدات المحلية';
      } else {
        this.localUnitsNames = name;
        console.log('✅ Local Unit Name:', this.localUnitsNames);
        this.fetchChartData(this.subSectorId(), 4, id);
      }
    });
  }
  resetData(): void {
    this.centersNames = 'المراكز';
    this.localUnitsNames = 'الوحدات المحلية';
    this.fetchChartData(this.subSectorId());
  }
}
