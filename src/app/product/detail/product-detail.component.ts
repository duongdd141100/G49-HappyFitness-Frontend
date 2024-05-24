import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/services/api.service';
import { AuthService } from 'src/app/services/services/auth.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  // imports: [CommonModule]
})

export class ProductDetailComponent implements OnInit {
  focus: any;
  focus1: any;
  value = '';
  note: any;
  nameNull = false;
  priceNull = false;
  product_name: any;
  product_price: any;
  selectedCategory: 1; // Biến lưu trữ loại sanpham được chọn
  roleNumber: null;
  quantity: number = 1;
  facilities: null;
  selectedFacility: any;
  code: any;
  imgPath: any;
  productByCode: any;
  statusProduct = [{code: "COMING_SOON", text: "Chưa bán"}, {code: "OUT_OF_STOCK", text: "Hết hàng"}, {code: "STOP_SELL", text: "Ngưng bán"}, {code: "ACTIVE", text: "Hoạt động"}, {code: "DEACTIVATE", text: "Vô hiệu hóa"}]

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.selectedFacility = 1
    this.authService.getOwnInfo().subscribe({
      next: (res) => {
        this.roleNumber = res.body.role.id
      }, // nextHandler
      error: (err) => {
        console.info(err)
        return
      }, // errorHandler
    })
    this.apiService.getAllFacility().subscribe({
      next: (res) => {
        this.facilities = res.body
        this.selectedFacility = res.body[0].id
      }, // nextHandler
      error: (err) => {
        console.info(err)
        return
      }, // errorHandler
    })
    // this.apiService.getAllCategory().subscribe({
    //   next: (res) => {
    //     this.categories = res.body
    //     this.selectedCategory = res.body[0].id
    //   }, // nextHandler
    //   error: (err) => {
    //     console.info(err)
    //     return
    //   }, // errorHandler
    // })
    // this.apiService.getAllSupplier().subscribe({
    //   next: (res) => {
    //     this.suppliers = res.body
    //   }, // nextHandler
    //   error: (err) => {
    //     return
    //   }, // errorHandler
    // })
    this.code = this.route.snapshot.paramMap.get('code')

    this.getProductByCode()
  }
  handleAddToCart() {
    // check role
    if(!this.roleNumber) {
      this.toastr.error(`Vui lòng đăng nhập!`); 
      return this.router.navigate(['/login']);
    }
    //check quantity
    if (!this.quantity || +this.quantity <= 0 || this.quantity > this.productByCode.stockQuantity) return; // số lượng sản phẩm không hợp lệ

    // check status product
    if(this.productByCode.status != this.statusProduct[3].code) return this.toastr.error(`Sản phẩm ${this.getStatusStr(this.productByCode.status)}`); 

    //check role có phải customer không
    if(this.roleNumber != 3) {
      return  this.toastr.error(`Bạn không phải khách hàng!`); 
    }

    // add to cart
    let dataCart = {
      quantity: +this.quantity,
      facilityProduct: {
        id: this.productByCode.facilityProductId
      }
    }
     this.apiService.addCart(dataCart).subscribe({
      next: (res) => {
        this.toastr.success('Thêm vào cart thành công!');
        this.apiService.viewCart()
      }, // nextHandler
      error: (err) => {
        console.info(err)
        return this.router.navigate(['/login']);
      }, // errorHandler
    })    
  }
  onFacilityChange(value) {
    this.selectedFacility = value;
    this.getProductByCode()
  }

  getProductByCode () {
    this.apiService.getProductByCode(this.code, this.selectedFacility).subscribe({
      next: (res) => {
        console.log(res);
        this.productByCode = res.body;
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

  // save() {
  //   const nextProduct = {
  //     name: this.product_name,
  //     category: {
  //       id: this.selectedCategory
  //     },
  //     supplier: {
  //       id: this.selectedSupplier
  //     },
  //     description: this.description
  //   }
  //   const nextFacilityProduct = {
  //     stockQuantity: this.quantity,
  //     price: this.product_price,
  //     status: this.statuses.find(it => it.text == this.status).code,
  //   }
  //   if (this.roleNumber == 1) {
  //     this.apiService.updateProduct(nextProduct, this.currentProductId).subscribe({
  //       next: (res) => {
  //         console.info(res)
  //       }, // nextHandler
  //       error: (err) => {
  //         console.info(err)
  //         return
  //       }, // errorHandler
  //     })
  //   }
  //   this.apiService.updateFacilityProduct(nextFacilityProduct, this.currentProductId, this.selectedFacility).subscribe({
  //     next: (res) => {
  //       console.info(res)
  //     }, // nextHandler
  //     error: (err) => {
  //       console.info(err)
  //       return
  //     }, // errorHandler
  //   })
  // }
  getStatusStr(statusCode) {
    return this.statusProduct.find((x) =>x.code === statusCode).text
  }
}
