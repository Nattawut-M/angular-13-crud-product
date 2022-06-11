import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { Product } from './interfaces/product';
import { ProductService } from './services/product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-13-crud';
  productList: Product[] = [];

  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '50%',
    });
  }

  getAllProduct(): void {
    this.productService.getAllProduct().subscribe({
      next: (response) => {
        // console.log(response);
        this.productList = response;
      },
      error: (err) => {
        console.log(err);
        alert('something went wrong, cannot fetch product.');
      },
    });
  }
}
