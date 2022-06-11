import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url: string = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getAllProduct() {
    return this.http.get(`${this.url}/list`);
  }

  addProduct(product: Product) {
    return this.http.post(`${this.url}/add`, product);
  }
}

// todo; playground angular 13 crud