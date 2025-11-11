import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {
  private readonly apiUrl = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getUserActivities(per_page: number, page: number): Observable<any> {
    const params = new HttpParams;
    params.set('per_page', per_page);
    params.set('page', page);

    const headers = new HttpHeaders({
      'Authorization': `Bearer 29|EBmJFZUrLEwwwBdBUjO2cHJNNQa0EEgOEdApr6kI506bd929`
    });
    return this.http.get(`${this.apiUrl}/user-activity/activities?`, { params, headers }).pipe(
      tap(response => {
        console.log('User activities fetched:', response);
      })
    );
  }


}
