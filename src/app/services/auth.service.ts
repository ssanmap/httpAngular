import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `https://damp-spire-59848.herokuapp.com/api/api/auth`;
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private TokenService:TokenService) { }

  login(email: string, password: string) :Observable<any>{
    return this.http.post <any>(`https://damp-spire-59848.herokuapp.com/api/auth/login`, { email, password })
      .pipe(
        tap(response => this.TokenService.saveToken(response.access_token))
        //console.log()
      )
  }
  profile() {
    return this.http.get<User>(`https://damp-spire-59848.herokuapp.com/api/auth/profile`)
      .pipe(
      tap( (user) => this.user.next(user))
    )
  }

  loginAndGet(email: string, password: string) :Observable<any>{
    return this.login(email, password)
    .pipe(
      switchMap(() => this.profile()),
    )
  }

  logOut() {
    localStorage.clear();
  }
}
