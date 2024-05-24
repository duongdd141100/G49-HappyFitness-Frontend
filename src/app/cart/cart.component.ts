import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject, debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  subject$ = new Subject<any>();
  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router) { }
  productCarts: any = [];
  productActives: Array<any> = [];
  ngOnInit(): void {
    this.onLoadCart();
    this.subject$
    .pipe(debounceTime(700)) // Thời gian chờ (ms)
    .subscribe((data) => {
      // Xử lý khi đã kết thúc nhập liệu sau thời gian chờ
      this.onUpdateProduct(data.product);
    });
  }
  onLoadCart() {
    this.apiService.viewCart()
    this.apiService.cart$.subscribe(
      (data) => {
        if(!data) return
        this.productCarts = data.body;
      },
      (error) => {
        console.error('Error fetching cart:', error);
      })
  }
  handleBuy() {
    if(this.productActives.length > 0) {
      if (this.productActives.some(x => x.quantity <= 0)) {
        return this.toastr.error('Số lượng sản phẩm không hợp lệ!');
      }
      sessionStorage.setItem('productBuys', JSON.stringify(this.productActives));
      this.router.navigate([`/order-checkout`])
    } else {
      return this.toastr.error('Chưa chọn sản phầm cần mua!');
    }
  }
  handleActiveAllProduct(e) {
    if(e.target.checked) {
      this.productActives = [...this.productCarts]
    } else {
      this.productActives = []
    }
  }
  handleUpdateCart(product, type?, e?) {
    if (!type) {
      let value = e.target.value
      if (value < 0 || value == '') {
        e.target.value = 1;
      }
      if (value > 500) {
        e.target.value = 500;
      }
      product.quantity = e.target.value;
      this.subject$.next({ product });
      return
    }
    if (type == 'add') {
      if (product.quantity == 500) return;
      product.quantity += 1;
    } else {
      if (product.quantity == 1) return;
      product.quantity -= 1;
    }
    this.onUpdateProduct(product);
  }
  onUpdateProduct(product) {
    let data = [
      {
        id: product.id,
        quantity: product.quantity
      }
    ]
    this.apiService.updateCart(data).subscribe({
      next: (res) => {
      }, // nextHandler
      error: (err) => {
        let str = err.error.body.split(' ');
        this.productCarts.filter(x => x.id = data[0].id)[0].quantity = str[str.length - 1];
        this.onUpdateProduct(this.productCarts.filter(x => x.id = data[0].id)[0]);
        return 
      }, // errorHandler
    });
  }
  handleActiveProduct(e, productActive) {
    if(e.target.checked) {
      this.productActives.push(productActive)
    } else {
      this.productActives = this.productActives?.filter((product) => product.id != productActive.id)
    }
  }
  handleDeleteProduct(product) {
    const cartDelete = [product.id]
    this.apiService.deleteCart(cartDelete).subscribe({
      next: (res) => {
        this.apiService.viewCart()
        sessionStorage.removeItem('productBuys');
      }, // nextHandler
      error: (err) => {
        return 
      }, // errorHandler
    });

  }
  checkProduct(id) {
    return this.productActives.find(product => product.id === id);
  }
}
