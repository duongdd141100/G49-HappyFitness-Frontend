import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-view-order-detail',
  templateUrl: './view-order-detail.component.html',
  styleUrls: ['./view-order-detail.component.scss']
})
export class ViewOrderDetailComponent implements OnInit {
  @Input() orderId:any;
  constructor(private apiService: ApiService) { }
  orderDetail:any
  ngOnInit(): void {
    if (this.orderId) this.onLoadOrderDetail()
  }
  onLoadOrderDetail() {
    this.apiService.findProductHistoryDetail(this.orderId).subscribe({
      next: (res) => {
        console.log(res.body);
        this.orderDetail = res.body
      }, // nextHandler
      error: (err) => {
        
        return
      }, // errorHandler
    })
  }
}
