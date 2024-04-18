import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // Import CommonModule ở đây
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { scrollToFirstInvalidControl, validateAllFormFields, validateForm } from 'src/app/functions/function-helper';
import { ApiService } from 'src/app/services/services/api.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  // imports: [CommonModule]
})

export class UpdateProductComponent implements OnInit, OnChanges {
  productForm: FormGroup;
  gettedProductForm: FormGroup = null;
  value = '';
  categories : any = [];
  suppliers : any = [];
  facilities : any = [];
  validateForm = validateForm;
  code: any;
  product: any = {};
  myPropSubject = new Subject();
  me: any;
  isReadOnly = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    public location: Location,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
      
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentValue = changes['_isLoadedMe'].currentValue;
    const isFirstChange = changes['_isLoadedMe'].isFirstChange();
    console.log(123123123123)
    console.log(currentValue)
    if (!isFirstChange) {
      // Call a method or perform any action when _isLoadedMe changes
      console.log(currentValue)
      this.onLoadProduct(2, true);
    }
  }

  ngOnInit() {
    this.onLoadMe();
    this.onLoadCategories();
    this.onLoadSuppliers();
    this.onLoadFacilities();
    this.value = 'default';
    this.code = this.route.snapshot.paramMap.get('code')
    // this.onLoadProduct(1, true);
    this.createProductForm();
  }
  onLoadMe() {
    this.apiService.me().subscribe({
      next: (res) => {
        if(!res.body) return this.me = {};
        this.me = res.body
        this.isReadOnly = this.me.role.id !== 1;
        if (this.isReadOnly) {
          this.productForm.controls['name'].disable();
          this.productForm.controls['imagePath'].disable();
          this.productForm.controls['categoryId'].disable();
          this.productForm.controls['supplierId'].disable();
          this.productForm.controls['description'].disable();
          this.productForm.controls['facilityId'].disable();
          this.onLoadProduct(this.me.facility.id, true);
        } else {
          this.onLoadProduct(1, true);
        }
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }
  onLoadProduct(facilityId, isFirstLoad) {
    this.apiService.getProductDetail(facilityId, this.code).subscribe({
      next: (res) => {
        if(!res.body) return this.product = {};
        this.product = res.body
        if (isFirstLoad) {
          this.productForm.patchValue({
            name: this.product.name,
            imagePath: this.product.imagePath,
            categoryId: this.product.categoryId,
            supplierId: this.product.supplierId,
            description: this.product.description,
            facilityId: this.product.facilityId,
            price: this.product.price,
            status: this.product.status,
            stockQuantity: this.product.stockQuantity,
          });
        } else {
          this.productForm.patchValue({
            price: this.product.price,
            status: this.product.status,
            stockQuantity: this.product.stockQuantity,
          });
        }
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
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
  onLoadFacilities() {
    this.apiService.getAllFacility().subscribe({
      next: (res) => {
        if(!res.body) return this.facilities = [];
        this.facilities = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }
  createProductForm () {
    this.productForm = this._formBuilder.group({
      name: [{value: null, disabled: this.isReadOnly}, [Validators.required]],
      imagePath: [{value: null, disabled: this.isReadOnly}],
      categoryId: [{value: null, disabled: this.isReadOnly}, [Validators.required]],
      supplierId: [{value: null, disabled: this.isReadOnly}, [Validators.required]],
      description: [{value: null, disabled: this.isReadOnly}],
      facilityId: [{value: null, disabled: this.isReadOnly}, [Validators.required]],
      price: [null, [Validators.required]],
      status: [null, [Validators.required]],
      stockQuantity: [null, [Validators.required]],
      
    })
  }
  saveForm() {
  if (this.productForm.valid) {
    let product = this.productForm.value;
    if (!this.isReadOnly) {
      this.apiService.updateProduct(
        {
          name: product.name,
          category: {
            id: product.categoryId,
          },
          supplier: {
            id: product.supplierId
          },
          imagePath: product.imagePath,
          description: product.description
        }, this.product.productId).subscribe({
        next: (res) => {
          if (res.code !== 200)  return this.toastr.error('Cập nhật sản phẩm thất bại!');
          this.toastr.success('Cập nhật sản phẩm thành công!');
          this.router.navigate(['/admin/products']);
        }, // nextHandler
        error: (err) => {
          console.info(err)
          this.toastr.error('Cập nhật sản phẩm thất bại!');
        }, // errorHandler
      })
    }
    this.apiService.updateFacilityProduct(
      {
        stockQuantity: product.stockQuantity,
        price: product.price,
        status: product.status
      }, this.product.productId, product.facilityId).subscribe({
      next: (res) => {
        if (res.code !== 200)  return this.toastr.error('Cập nhật sản phẩm thất bại!');
        this.toastr.success('Cập nhật sản phẩm thành công!');
        this.router.navigate(['/admin/products']);
      }, // nextHandler
      error: (err) => {
        console.info(err)
        this.toastr.error('Cập nhật sản phẩm thất bại!');
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

  handleSelectFacility(e) {
    this.onLoadProduct(e.target.value, false)
  }
}
