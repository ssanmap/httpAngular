import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Product } from './../models/product.model';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl + '/products');
  }

  getByCategory(categoryId: string, limit?: number, offset?: number) {

    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, {params})
    
  }
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
  }
  create(data:any) {
    return this.http.post<Product>(this.apiUrl + '/products', data);
  }
  update(id:string,dto: any) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto)
  }
  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`)
  }

  getProductByPage(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params, context: checkTime()
    })
  }
}
