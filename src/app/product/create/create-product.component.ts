import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { scrollToFirstInvalidControl, validateAllFormFields, validateForm } from 'src/app/functions/function-helper';
import { ApiService } from 'src/app/services/services/api.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  // imports: [CommonModule]
})

export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  value = '';
  note: any;
  nameNull = false;
  quantityNull = false;
  ticket_name: any;
  ticket_price: any;
  ticket_quantity: any;
  categories : any = [];
  suppliers : any = [];
  validateForm = validateForm
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    public location: Location,
    private _formBuilder: FormBuilder,
  ) {
    this.productForm = this.createProductForm();

   }
  ngOnInit() {
    this.onLoadCategories();
    this.onLoadSuppliers();
    this.value = 'default';
  }
  onLoadSuppliers() {
    this.apiService.getAllSupplier().subscribe({
      next: (res) => {
        if(!res.body) return this.suppliers = [];
        this.suppliers = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }
  onLoadCategories() {
    this.apiService.getAllCategory().subscribe({
      next: (res) => {
        if(!res.body) return this.categories = [];
        this.categories = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }
  createProductForm  = ():FormGroup => {
    return this._formBuilder.group({
      name: [null, [Validators.required]],
      imagePath: [null],
      categoryId: [null,[Validators.required]],
      supplierId: [null,[Validators.required]],
      description: [null]
    })
  }
  saveForm() {
  if (this.productForm.valid) {
    let product = this.productForm.value;
    this.apiService.createProduct(
      JSON.stringify({
        name: product.name,
        category: {
          id: product.categoryId,
        },
        supplier: {
          id: product.supplierId
        },
        imagePath: product.imagePath,
        description: product.description
      })).subscribe({
      next: (res) => {
        if (res.code !== 200)  return this.toastr.error('Tạo sản phẩm thất bại!');
        this.toastr.success('Tạo sản phẩm thành công!');
        this.router.navigate(['/admin/products']);
      }, // nextHandler
      error: (err) => {
        console.info(err)
        this.toastr.error('Tạo sản phẩm thất bại!');
      }, // errorHandler
    })
  } else {
    validateAllFormFields(this.productForm);
    scrollToFirstInvalidControl(this.productForm);
  }
  }
  

  selectedOption(string: string) {
    this.value = string;
  }

  viewAll() {

  }

  cancel() {

  }

  save() {
    this.toastr.success('Tạo vé thành công!');
  
  }
}
