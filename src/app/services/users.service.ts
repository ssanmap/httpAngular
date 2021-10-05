import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/api/users`;

  constructor( private http:HttpClient) { }

  create(dto: any) {
    return this.http.post(this.apiUrl, dto)
  }
  getAll() {
    return this.http.get(this.apiUrl);
  }
}
