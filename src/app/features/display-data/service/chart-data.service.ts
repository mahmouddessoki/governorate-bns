import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  private readonly apiUrl = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getChartData(
    subSectorId?: number,
    localUnitId?: number,
    center_id?: number
  ): Observable<any> {
    let params = new HttpParams();
    if (center_id) {
      params = params.set('center_id', center_id);
    }
    if (localUnitId) {
      params = params.set('local_unit_id', localUnitId);
    }
    if (subSectorId) {
      params = params.set('sub_sector_id', subSectorId);
    }

    return this.http
      .get(`${this.apiUrl}population-charts`, {
        params,
      })
      .pipe(
        tap((response) => {
          console.log('Chart data fetched:', response);
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
