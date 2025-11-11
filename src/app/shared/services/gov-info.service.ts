import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { infoRes, subSectorRes } from '../models/info';

@Injectable({
  providedIn: 'root',
})
export class GovInfoService {
  private http = inject(HttpClient);
  constructor() {}

  getMainInfo(name: string): Observable<infoRes> {
    return this.http.get<infoRes>(`${environment.BASE_URL}${name}`);
  }

  getSubSector(id: string): Observable<subSectorRes> {
    return this.http.get<subSectorRes>(
      `${environment.BASE_URL}main-sectors/${id}/sub-sectors`
    );
  }
}
