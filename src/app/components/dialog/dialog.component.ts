import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

type Category = {
  name: string;
  code: string;
};

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  categories: Category[] = [
    { name: 'มือถือ (Mobile)', code: 'mobile' },
    { name: 'แท็บเล็ต (Tablet)', code: 'tablet' },
    { name: 'คอมพิวเตอร์ (Computer)', code: 'com' },
    { name: 'แล็บท็อป (Laptop)', code: 'laptop' },
  ];

  productType: Category[] = [
    { name: 'สินค้ามือหนึ่ง (Brand New)', code: '1' },
    { name: 'สินค้ามืสอง (Second Hand)', code: '2' },
    { name: 'สินค้ารีเฟอร์ (Refurbished)', code: '3' },
  ];
  dateToday: string = new Date().toLocaleDateString('en-GB');

  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private rowProductSelected: Product
  ) {}

  ngOnInit(): void {
    this.initialForm(this.rowProductSelected);
  }

  initialForm(product: Product): void {
    this.productForm = this.formBuilder.group({
      name: [product.name || '', Validators.required],
      price: [product.price || '', Validators.required],
      date: [product.date || '', Validators.required],
      category: [product.category || '', Validators.required],
      type: [product.type || '', Validators.required],
      detail: [product.detail || '', Validators.required],
    });
  }

  onSubmit(): void {
    // console.log(this.productForm.value);

    this.rowProductSelected
      ? this.updateProductById(this.rowProductSelected.id!)
      : this.createNewProduct();
  }

  updateProductById(id: number) {
    this.productService
      .updateProductById(id, this.productForm.value)
      .subscribe({
        next: (res) => {
          // console.log(res);
          // alert('updated new product.');
          this.dialogRef.close('update');
          this.productForm.reset();
        },
        error: (err) => console.log(err),
        complete: () => console.log('completed.'),
      });
  }

  createNewProduct() {
    this.productService.addProduct(this.productForm.value).subscribe({
      next: (res) => {
        alert('added new product.');
        // console.log(res);
        this.dialogRef.close('saved !');
        this.productForm.reset();
      },
      error: (err) => console.log(err),
      // complete: () => console.log('completed.'),
    });
  }
}
