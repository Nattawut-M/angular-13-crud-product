import {
  OnInit,
  AfterViewInit,
  Component,
  ViewChild,
  Input,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() productList: any[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'type',
    'category',
    'date',
    'detail',
    'option'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  intialTable() {
    console.log('productlist initial\t', this.productList);
    this.dataSource = new MatTableDataSource(this.productList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
  }

  applyFilter(event: Event) {
    const filterProduct = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterProduct.trim().toLowerCase();

    this.dataSource.paginator && this.dataSource.paginator.firstPage();
  }

  getAllProduct(): void {
    this.productService.getAllProduct().subscribe({
      next: (response) => {
        console.log(response);
        this.productList = response;
        console.log('productlist initial\t', this.productList);
        this.dataSource = new MatTableDataSource(this.productList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      },
      error: (err) => {
        console.log(err);
        alert('something went wrong, cannot fetch product.');
      },
    });
  }
}
