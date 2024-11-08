import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ProductsService {
  private readonly API = environment.API;
  private readonly http = inject(HttpClient);

  public getCategories():Observable<string[]>{
    return this.http.get<string[]>(`${this.API}/products/categories`);
  }

  public getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.API}/products`);
  }
  
  public getProduct(productId:number):Observable<Product>{
    return this.http.get<Product>(`${this.API}/products/${productId}`);
  }
}
