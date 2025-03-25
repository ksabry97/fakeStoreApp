import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class FakeStoreService {
  constructor(private http: HttpClient) {}

  baseUrl = Environment.baseUrl;

  // get all products
  getAllProducts() {
    let url = this.baseUrl + `products`;
    return this.http.get(url);
  }

  // get product

  getProduct(productId: string) {
    let url = this.baseUrl + `products/${productId}`;
    return this.http.get(url);
  }

  addProduct(product: any) {
    let url = this.baseUrl + `products`;
    return this.http.post(url, product);
  }
}
