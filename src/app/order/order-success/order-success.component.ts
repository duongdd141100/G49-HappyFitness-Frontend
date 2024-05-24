import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
  responseCode: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private toast: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Lấy giá trị của param từ URL
      const orderId = params['id']; // Đây là giá trị '38' trong URL http://localhost:4200/order-success/38
        this.route.queryParams.subscribe(queryParams => {
          this.responseCode = queryParams['vnp_ResponseCode']; // Đây là giá trị '00' trong URL
          
          if (this.responseCode === '00') {
            this.toast.success('Thanh toán thành công!');
          } else {
            this.toast.error('Thanh toán thất bại!');
          }
          if(this.responseCode !== '00') return;
          if(orderId) {
            this.apiService.completePayment(this.responseCode, orderId).subscribe({
              next: (res) => {
                let timeout = setTimeout(() => {
                  this.router.navigate(['/home']); // Điều hướng đến trang home
                  clearTimeout(timeout); //
                }, 2000);
              }, // nextHandler
              error: (err) => {
                return
              }, // errorHandler
            })
          } else { //order pakage
            let dataOrderPakage
            if (!queryParams['classId']) {
              const decodedString = decodeURIComponent(queryParams['mapDayOfWeekWithTrainTimeId']);
              // Loại bỏ dấu ngoặc kép từ các key
              const modifiedString = JSON.parse(decodedString);
              
              dataOrderPakage = {
                facilityId: +queryParams['facilityId'],
                ptId: +queryParams['ptId'],
                packageId: +queryParams['packageId'],
                mapDayOfWeekWithTrainTimeId: modifiedString
              }
            } else {
              dataOrderPakage = {
                classId: +queryParams['classId'],
                packageId: +queryParams['packageId']
              }
            }
            this.apiService.completePayment(this.responseCode, null, dataOrderPakage).subscribe({
              next: (res) => {
                let timeout = setTimeout(() => {
                  this.router.navigate(['/home']); // Điều hướng đến trang home
                  clearTimeout(timeout); //
                }, 2000);
              }, // nextHandler
              error: (err) => {
                return
              }, // errorHandler
            })
          }
          
          
          // Sử dụng orderId và responseCode ở đây
        });
      // Lấy giá trị của query params từ URL
     
    });
    
  }
 
}
