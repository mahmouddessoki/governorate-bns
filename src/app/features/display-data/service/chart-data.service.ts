import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { map, Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseAdapterService } from './../../../shared/services/response-adapter.service';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  private readonly apiUrl = environment.BASE_URL;
  pageType = signal<string>('');

  constructor(
    private http: HttpClient,
    private responseAdapterService: ResponseAdapterService
  ) {}

  getChartData(center_id?: number, localUnitId?: number): Observable<any> {
    let params = new HttpParams();
    if (center_id) {
      params = params.set('center_id', center_id);
    }
    if (localUnitId) {
      params = params.set('local_unit_id', localUnitId);
    }

    return this.http
      .get(`${this.apiUrl}population-charts`, {
        params,
      })
      .pipe(
        map((response) => {
          console.log('Adapted Chart Data Response:', response);
          response = this.responseAdapterService.adapt(response as any);
          console.log('Adapted Chart Data Response:', response);
          return response;
        })
      );
  }
  getFamiliesCount(center_id?: number, localUnitId?: number) {
    let params = new HttpParams();
    if (center_id) {
      params = params.set('center_id', center_id);
    }
    if (localUnitId) {
      params = params.set('local_unit_id', localUnitId);
    }
    return this.http.get(`${this.apiUrl}families-count`, { params }).pipe(
      map((response) => {
        response = this.responseAdapterService.adapt(response as any);
        return response;
      })
    );
  }

  getEzbaCount(center_id?: number, localUnitId?: number): Observable<any> {
    let params = new HttpParams();
    if (center_id) {
      params = params.set('center_id', center_id);
    }
    if (localUnitId) {
      params = params.set('local_unit_id', localUnitId);
    }
    return this.http.get(`${this.apiUrl}ezba-count`, { params }).pipe(
      map((response) => {
        response = this.responseAdapterService.adapt(response as any);
        return response;
      })
    );
  }

  getNaturalIncreaseRate(
    centerId?: number,
    localUnitId?: number
  ): Observable<any> {
    let params = new HttpParams();
    if (centerId) {
      params = params.set('center_id', centerId);
    }
    if (localUnitId) {
      params = params.set('local_unit_id', localUnitId);
    }
    return this.http.get(`${this.apiUrl}natural-IncreaseRate`, { params }).pipe(
      map((response) => {
        response = this.responseAdapterService.adapt(response as any);
        return response;
      }),
      tap((data) => {
        console.log('Natural Increase Rate Data:', data);
      })
    );
  }
  getMaritalStatusStatistics(
    centerId?: number,
    localUnitId?: number
  ): Observable<any> {
    let params = new HttpParams();
    if (centerId) {
      params = params.set('center_id', centerId);
    }
    if (localUnitId) {
      params = params.set('local_unit_id', localUnitId);
    }
    return this.http
      .get(`${this.apiUrl}maritalStatusStatistics`, { params })
      .pipe(
        map((response) => {
          response = this.responseAdapterService.adapt(response as any);
          return response;
        }),
        tap((data) => {
          console.log('Natural Increase Rate Data:', data);
        })
      );
  }
  getAreaBuildingsStatistics(
    centerId?: number,
    localUnitId?: number
  ): Observable<any> {
    let params = new HttpParams();
    if (centerId) {
      params = params.set('center_id', centerId);
    }
    if (localUnitId) {
      params = params.set('local_unit_id', localUnitId);
    }
    return this.http
      .get(`${this.apiUrl}area-buildings-statistics`, { params })
      .pipe(
        map((response) => {
          response = this.responseAdapterService.adapt(response as any);
          return response;
        }),
        tap((data) => {
          console.log('Area Buildings Statistics Data:', data);
        })
      );
  }

  getAgeGroupStatistics(
    centerId?: number,
    localUnitId?: number
  ): Observable<any> {
    let params = new HttpParams();
    if (centerId) {
      params = params.set('center_id', centerId);
    }
    if (localUnitId) {
      params = params.set('local_unit_id', localUnitId);
    }
    return this.http.get(`${this.apiUrl}ageGroupStatistics`, { params }).pipe(
      map((response) => {
        response = this.responseAdapterService.adapt(response as any);
        return response;
      }),
      tap((data) => {
        console.log('Age Group Statistics Data:', data);
      })
    );
  }

  getEducationStatistics(
    centerId?: number,
    localUnitId?: number
  ): Observable<any> {
    let params = new HttpParams();
    if (centerId) {
      params = params.set('center_id', centerId);
    }
    if (localUnitId) {
      params = params.set('local_unit_id', localUnitId);
    }
    return this.http.get(`${this.apiUrl}education-Statistics`, { params }).pipe(
      map((response) => {
        response = this.responseAdapterService.adapt(response as any);
        return response;
      }),
      tap((data) => {
        console.log('Education Statistics Data:', data);
      })
    );
  }

  getCenters(): Observable<any> {
    return this.http.get(`${this.apiUrl}centers`).pipe(
      tap((response) => {
        console.log('Centers fetched:', response);
      })
    );
  }
  getLocalUnits(): Observable<any> {
    return this.http.get(`${this.apiUrl}local-units`).pipe(
      tap((response) => {
        console.log('Local Units fetched:', response);
      })
    );
  }
}
