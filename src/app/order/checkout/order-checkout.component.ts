import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/services/api.service';


@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss'],
  // imports: [CommonModule]
})

export class OrderCheckoutComponent implements OnInit {
  focus: any;
  focus1: any;
  value = '';
  productBuys: any;
  options = ['Không thanh toán', 'Vnpay'];
  selectedOptionBuy: any;
  vouchers: any = [];
  voucherSelect:any;
  discountVoucher:any;
  totalPrice: any;
  constructor(private router: Router, private toast: ToastrService, private apiService: ApiService) { }

  ngOnInit() {
    if (sessionStorage.getItem('productBuys') && JSON.parse(sessionStorage.getItem('productBuys')).length > 0) {
      this.selectedOptionBuy = this.options[1]
      this.productBuys = JSON.parse(sessionStorage.getItem('productBuys'));
      this.onLoadVouchers();
      this.totalPrice = this.onTotalPriceNoVoucher();
    } else {
      this.router.navigate([`/cart`]);
      this.toast.error('Vui lòng chọn sản phẩm!');
    }
  }
  handlePaymentOrder() {
    const dataIdCart = this.productBuys.map(item => item.id);
    if(this.selectedOptionBuy == this.options[1]) {
      this.apiService.createOrder(dataIdCart, this.voucherSelect?.code).subscribe({
        next: (res) => {
          this.apiService.viewCart();
          this.apiService.createPayment(this.totalPrice, res.body.id).subscribe({
            next: (res) => {
              console.log(res);
              window.close();
              window.open(res.body, '_blank');
            }, // nextHandler
            error: (err) => {
              return 
            }, // errorHandler
          })
          
        }, // nextHandler
        error: (err) => {
          return 
        }, // errorHandler
      })
    } else {
      this.apiService.createOrder(dataIdCart, this.voucherSelect?.code).subscribe({
        next: (res) => {
          this.apiService.viewCart();
          this.router.navigate(['/cart']);
          return this.toast.success('Đặt hàng thành công!');
        }, // nextHandler
        error: (err) => {
          return 
        }, // errorHandler
      })
    }
  }
  handleActiveVoucher(v) {
    this.voucherSelect = v
    let total = this.onTotalPriceNoVoucher();
    let valueDiscount = (total * v.percentAmount) / 100;
    if(valueDiscount > v.maxMoneyAmount) {
      valueDiscount = v.maxMoneyAmount;
    }
    this.discountVoucher = valueDiscount;
    this.totalPrice = total - valueDiscount;
  }
  onLoadVouchers() {
    this.apiService.findAllVoucher().subscribe({
      next: (res) => {
        this.vouchers = res.body
      }, // nextHandler
      error: (err) => {
        return 
      }, // errorHandler
    })
  }
  selectedOption(string: string) {
    this.value = string;
  }
  onTotalPriceNoVoucher():number {
    return this.productBuys.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  }
  viewAll() {

  }
}
