import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-ticket-customer-order',
  templateUrl: './ticket-customer-order.component.html',
  styleUrls: ['./ticket-customer-order.component.scss']
})
export class TicketCustomerOrderComponent implements OnInit {
  ticketHistorys: any;
  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.onLoadTicketHistory();
  }
  handleExtendTicket(t) {

    this.apiService.onExtendTicket(t.id, t.voucher ? t.voucher.code : null).subscribe({
      next: (res) => {
        console.log(res);
        this.apiService.createPayment(t.price, null , res.body.id).subscribe({
          next: (res) => {
            window.close();
            window.open(res.body, '_blank');
          }, // nextHandler
          error: (err) => {
            return 
          }, // errorHandler
        })
        this.toastr.success('Gia hạn vé thành công!');
      }, // nextHandler
      error: (err) => {
       
        return
      }, // errorHandler
    })
  }
  onLoadTicketHistory() {
    this.apiService.getTicketCustomerHistory().subscribe({
      next: (res) => {
        this.ticketHistorys = res.body
      }, // nextHandler
      error: (err) => {
       
        return
      }, // errorHandler
    })
  }
}
