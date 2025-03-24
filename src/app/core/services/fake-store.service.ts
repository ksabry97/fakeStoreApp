import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FakeStoreService {
  constructor(private http: HttpClient) {}

  baseUrl = Environment.baseUrl;

  getAllProducts() {
    let url = this.baseUrl + `products`;
    return this.http.get(url);
  }
}
