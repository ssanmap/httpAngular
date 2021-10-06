import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Product } from './../models/product.model';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products/';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}${id}`)
  }
  create(data:any) {
    return this.http.post<Product>(this.apiUrl, data);
  }
  update(id:string,dto: any) {
    return this.http.put<Product>(`${this.apiUrl}${id}`, dto)
  }
  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}${id}`)
  }

  getProductByPage(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params, context: checkTime()
    })
  }
}
