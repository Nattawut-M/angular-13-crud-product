import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

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
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      date: [this.dateToday, Validators.required],
      category: ['', Validators.required],
      type: ['', Validators.required],
      detail: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.productForm.value);
    this.productService.addProduct(this.productForm.value).subscribe({
      next: (res) => {
        alert('added new product.');
        console.log(res);
        this.dialogRef.close('saved !');
        this.productForm.reset();
      },
      error: (err) => console.log(err),
      complete: () => console.log('completed.'),
    });
  }
}

type Category = {
  name: string;
  code: string;
};
