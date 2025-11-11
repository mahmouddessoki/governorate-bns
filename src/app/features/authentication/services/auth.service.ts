import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { loginRes, UserLogin } from '../models/user-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  constructor() {}


  signIn(user:UserLogin):Observable<loginRes> {
   return this.http.post<loginRes>(`${environment.BASE_URL}login`, user);
  }



}
