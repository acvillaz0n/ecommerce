import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable()
export class ProductsService {
  private readonly API = "https://fakestoreapi.com"
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
