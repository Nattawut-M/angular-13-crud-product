import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

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
  }
}

type Category = {
  name: string;
  code: string;
};
