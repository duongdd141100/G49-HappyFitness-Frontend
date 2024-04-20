import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/services/api.service';
import { ViewOrderDetailComponent } from './view-order-detail/view-order-detail.component';

@Component({
  selector: 'app-product-customer-order',
  templateUrl: './product-customer-order.component.html',
  styleUrls: ['./product-customer-order.component.scss']
})
export class ProductCustomerOrderComponent implements OnInit {
  productHistorys: any
  constructor(private apiService: ApiService, private _modal: NgbModal) { }

  ngOnInit(): void {
    this.onLoadProductHistory();
  }
  onLoadProductHistory() {
    this.apiService.findProductHistory().subscribe({
      next: (res) => {
        console.log(res.body);
        this.productHistorys = res.body
      }, // nextHandler
      error: (err) => {
       
        return
      }, // errorHandler
    })
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
