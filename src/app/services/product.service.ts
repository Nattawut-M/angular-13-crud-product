import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/product-list/${id}`);
  }

  addProduct(product: Product) {
    return this.http.post(`${this.url}/product-list`, product);
  }

  updateProductById(id: number, data: Product) {
    return this.http.put<Product>(`${this.url}/product-list/${id}`, data);
  }

  deleteProductById(id: number) {
    return this.http.delete(`${this.url}/product-list/${id}`);
  }
}
