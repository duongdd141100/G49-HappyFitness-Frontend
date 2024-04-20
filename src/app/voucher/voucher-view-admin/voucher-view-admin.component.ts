import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/services/api.service';


@Component({
  selector: 'app-list-ticket-admin',
  templateUrl: './voucher-view-admin.component.html',
  styleUrls: ['./voucher-view-admin.component.scss'],
  // imports: [CommonModule]
})

export class VoucherViewAdminComponent implements OnInit {
  value = '';
  vouchers: any = [];
  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.onLoadAllVoucher();
    this.value = 'default';
  }
  handleSelectFacility(e) {
    let value = e.target.value
  }
  onLoadAllVoucher() {
    this.apiService.findAllVoucher().subscribe({
      next: (res) => {
        if(!res.body) return this.vouchers = [];
        this.vouchers = res.body
        this.vouchers = this.vouchers.map(e => {
          e.maxMoneyAmount = (+e.maxMoneyAmount).toLocaleString('en-US', { style: 'currency', currency: 'VND' });
          return e;
        })

        console.log(this.vouchers)
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

  }

  update(id: any) {
    this.router.navigate([`/admin/update-voucher/${id}`]);
  }

  add() {
    this.router.navigate(['/admin/create-voucher']);
  }
  formatDateDdMmYyyy(value) {
    return formatDate(value, 'dd/MM/yyyy', 'en-US');
  }
}
