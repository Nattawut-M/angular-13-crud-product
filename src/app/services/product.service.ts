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
    return this.http.get<Product[]>(`${this.url}/product-list`);
  }

  addProduct(product: Product) {
    return this.http.post(`${this.url}/product-list`, product);
  }
}

// todo; playground angular 13 crud