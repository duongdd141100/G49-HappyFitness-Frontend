import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/services/api.service';


@Component({
  selector: 'app-checkout-ticket',
  templateUrl: './checkout-ticket.component.html',
  styleUrls: ['./checkout-ticket.component.scss'],
  // imports: [CommonModule]
})

export class OrderCheckoutTicketComponent implements OnInit , OnDestroy{
  focus: any;
  focus1: any;
  value = '';
  ticketBuys: any;
  options = ['Vnpay'];
  selectedOptionBuy: any;
  vouchers: any = [];
  voucherSelect:any;
  discountVoucher:any;
  totalPrice: any;
  constructor(private router: Router, private toast: ToastrService, private apiService: ApiService) { }

  ngOnInit() {
    if (sessionStorage.getItem('ticketBuys') && JSON.parse(sessionStorage.getItem('ticketBuys')).length > 0) {
      this.selectedOptionBuy = this.options[0]
      this.ticketBuys = JSON.parse(sessionStorage.getItem('ticketBuys'));
      console.log(this.ticketBuys);
      
      this.onLoadVouchers();
      this.totalPrice = this.onTotalPriceNoVoucher();
    } else {
      this.router.navigate([`/tickets`]);
      this.toast.error('Vui lòng chọn vé!');
    }
  }
  handlePaymentOrder() {
    const ticketId = this.ticketBuys[0].id;
    if(this.selectedOptionBuy == this.options[0]) {
      this.apiService.createTicketBuy(ticketId, this.voucherSelect?.code).subscribe({
        next: (res) => {
          this.apiService.createPayment(this.totalPrice, null , res.body.id).subscribe({
            next: (res) => {
              console.log(res);
              window.close();
              window.open(res.body, '_blank');
            }, // nextHandler
            error: (err) => {
              if(err.status  === 401) {
                this.toast.error('Vui lòng đăng nhập!');
                this.router.navigate(['/login']);
              }
              return 
            }, // errorHandler
          })
          
        }, // nextHandler
        error: (err) => {
          if(err.status  === 401) {
            this.toast.error('Vui lòng đăng nhập!');
            this.router.navigate(['/login']);
          }
          return 
        }, // errorHandler
      })
    }
  }
  ngOnDestroy(): void {
    sessionStorage.removeItem('ticketBuys');
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
    return this.ticketBuys.reduce((acc, product) => acc + product.price, 0);
  }
  viewAll() {

  }
}
