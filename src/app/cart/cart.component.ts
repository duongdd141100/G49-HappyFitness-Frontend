import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  productCarts: any = [];
  productActives: Array<any> = [];
  ngOnInit(): void {
    this.onLoadCart();
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
    
  }
  handleActiveAllProduct(e) {
    if(e.target.checked) {
      this.productActives = [...this.productCarts]
    } else {
      this.productActives = []
    }
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
