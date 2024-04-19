import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Lấy giá trị của param từ URL
      const orderId = params['id']; // Đây là giá trị '38' trong URL http://localhost:4200/order-success/38
  
      // Lấy giá trị của query params từ URL
      this.route.queryParams.subscribe(queryParams => {
        const responseCode = queryParams['vnp_ResponseCode']; // Đây là giá trị '00' trong URL
        console.log(orderId);
        console.log(responseCode);
        this.apiService.completePayment(responseCode, orderId).subscribe()
        // Sử dụng orderId và responseCode ở đây
      });
    });
  }

}
