import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient, private TokenService:TokenService) { }

  login(email: string, password: string) :Observable<any>{
    return this.http.post <any>(`${environment.apiUrl}/api/auth/login`, { email, password })
      .pipe(
        tap(response => this.TokenService.saveToken(response.access_token))
        //console.log()
      )
  }
  profile() {
    return this.http.get(`${environment.apiUrl}/api/auth/profile`, {
     // headers: {
     //   Authorization: `Bearer ${token}`,
    //  }
    })
  }

  loginAndGet(email: string, password: string) :Observable<any>{
    return this.login(email, password)
    .pipe(
      switchMap(() => this.profile()),
    )
  }
}
