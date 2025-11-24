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

  getUserActivities(page: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}user-activity/activities?page=${page}`)

  }
}
