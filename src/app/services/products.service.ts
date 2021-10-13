import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

import { Product } from './../models/product.model';
import { checkTime } from '../interceptors/time.interceptor';
import { catchError } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';

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


 fetchReadAndUpdate(id: string, dto: any) {
    return zip(
      this.getOne(id),
      this.update(id, dto)
    );
  }

  getOne(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salio mal');
      })
    )
  }

}
