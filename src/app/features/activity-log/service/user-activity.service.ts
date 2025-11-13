import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserActivityService {
  private readonly apiUrl = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getUserActivities(per_page: number, page: number): Observable<any> {
    const params = new HttpParams();
    params.set('per_page', per_page);
    params.set('page', page);

    return this.http
      .get(`${this.apiUrl}user-activity/activities?`, { params })
      .pipe(
        tap((response) => {
          console.log('User activities fetched:', response);
        })
      );
  }
}
