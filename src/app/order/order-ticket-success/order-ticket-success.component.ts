import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-order-ticket-success',
  templateUrl: './order-ticket-success.component.html',
  styleUrls: ['./order-ticket-success.component.scss']
})
export class OrderTicketSuccessComponent implements OnInit {
  responseCode: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Lấy giá trị của param từ URL
      const ticketIdOrder = params['id']; // Đây là giá trị '38' trong URL http://localhost:4200/order-success/38
  
      // Lấy giá trị của query params từ URL
      this.route.queryParams.subscribe(queryParams => {
        this.responseCode = queryParams['vnp_ResponseCode']; // Đây là giá trị '00' trong URL
        this.apiService.completePaymentTicket(this.responseCode, ticketIdOrder).subscribe()
        if (this.responseCode === '00') {
          this.toast.success('Thanh toán thành công!');
        } else {
          this.toast.error('Thanh toán thất bại!');
        }
        // Sử dụng orderId và responseCode ở đây
      });
    });
  }

}
