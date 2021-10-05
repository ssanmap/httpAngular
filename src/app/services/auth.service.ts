import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) :Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/auth/login`, {email, password})
  }
  profile(token: string) {
    return this.http.get(`${environment.apiUrl}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  loginAndGet(email: string, password: string) :Observable<any>{
    return this.login(email, password)
    .pipe(
      switchMap(rta => this.profile(rta.access_token)),
    )
  }
}
