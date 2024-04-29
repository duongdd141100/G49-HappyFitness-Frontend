import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/services/api.service'
import { AuthService } from 'src/app/services/services/auth.service';
import { ViewOrderDetailComponent } from 'src/app/ticket/product-customer-order/view-order-detail/view-order-detail.component';


@Component({
  selector: 'app-list-product',
  templateUrl: './order-admin-view.component.html',
  styleUrls: ['./order-admin-view.component.scss'],
  // imports: [CommonModule]
})

export class OrderAdminViewComponent implements OnInit {
  isPaid: boolean = null;
  isDelivered: boolean = null;
  facilityId: number = null;
  value = '';
  orders: any = [];
  facilities: any = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private _modal: NgbModal,
  ) { }

  ngOnInit() {
    this.onLoadOrders(null, null, null);
    this.onLoadFacilities();
    this.value = 'default';
  }

  onLoadOrders(facility: number, isPaid: boolean, isDelivered: boolean) {
    this.apiService.findOrders(facility, isPaid, isDelivered).subscribe({
      next: (res) => {
        this.orders = res.body
        this.orders = this.orders.map(e => {
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

  edit(code: any) {
    this.router.navigate([`/edit-product/${code}`])
  }

  add() {
    this.router.navigate(['/create-product']);
  }

  handleSelectFacility(e) {
    let value = e.target.value
    this.facilityId = value === 'all' ? null : value;
    this.onLoadOrders(this.facilityId, this.isPaid, this.isDelivered)
  }
  
  handleSelectPaidStatus(e) {
    let value = e.target.value
    this.isPaid = value === 'all' ? null : value;
    this.onLoadOrders(this.facilityId, this.isPaid, this.isDelivered)
  }
  handleSelectOrderStatus(e) {
    let value = e.target.value
    this.isDelivered = value === 'all' ? null : value;
    this.onLoadOrders(this.facilityId, this.isPaid, this.isDelivered)
  }
  handleViewDetail(p) {
    const modalRef = this._modal.open(ViewOrderDetailComponent, {
      //scrollable: true,
      size: 'lg', //'sm' | 'lg' | 'xl' | string;
      backdropClass: 'service-backdrop',
      windowClass: 'service-window',
      centered: true
    })
    modalRef.componentInstance.orderId = p.id;
    modalRef.result.then(result => {
      if (!result) { return }
    }).catch(error => { return error })
  }
}
