import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/services/api.service'
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
  // imports: [CommonModule]
})

export class ListProductComponent implements OnInit {
  value = '';
  products: any = [];
  facilities: any = [];
  roleId: any;
  me: any;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.onLoadMe();
    this.onCheckRole();
    this.onLoadProducts(1);
    this.onLoadFacilities();
    this.value = 'default';
  }
  onLoadMe() {
    this.apiService.me().subscribe({
      next: (res) => {
        if(!res.body) return this.me = {};
        this.me = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

  onCheckRole() {
    this.authService.getOwnInfo().subscribe({
      next: (res) => {
        this.roleId = res.body.role.id
        if (res.body.role && res.body.role.id === 3) {
          // TODO: handle not allow notification
          this.router.navigate([`/products`])
          return
        }
      }, // nextHandler
      error: (err) => {
        console.info(err)
        this.router.navigate([`/home`])
        return
      }, // errorHandler
    });
  }

  onLoadProducts(facilityId : number) {
    this.apiService.getProduct(facilityId).subscribe({
      next: (res) => {
        this.products = res.body
        this.products = this.products.map(e => {
          e.price = (+e.price).toLocaleString('en-US', { style: 'currency', currency: 'VND' });
          return e;
        });
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

  onLoadFacilities() {
    this.apiService.getAllFacility().subscribe({
      next: (res) => {
        this.facilities = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

  selectedOption(string: string) {
    this.value = string;
  }

  viewAll() {

  }

  delete(id: any) {
    this.apiService.deactiveProduct(id).subscribe({
      next: (res) => {
        this.products = this.products.map(it => {
          if (it.productId === id) {
            it.status = "Vô hiệu hóa"
          }

          return it
        })
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

  active(id: any) {
    this.apiService.activeProduct(id).subscribe({
      next: (res) => {
        this.products = this.products.map(it => {
          if (it.productId === id) {
            it.status = "Chưa bán"
          }

          return it
        })
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

  edit(code: any) {
    this.router.navigate([`/admin/update-product/${code}`]);
  }

  add() {
    this.router.navigate(['/admin/create-product']);
  }

  handleSelectFacility(e) {
    this.onLoadProducts(e.target.value)
  }
}
