import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/services/api.service';


@Component({
  selector: 'app-list-ticket-admin',
  templateUrl: './list-ticket-admin.component.html',
  styleUrls: ['./list-ticket-admin.component.scss'],
  // imports: [CommonModule]
})

export class CustomerTicketAdComponent implements OnInit {
  customerTickets: any = [];
  facilities: any = [];
  facilitySelect: string;
  facilityId: string;
  isActive: string;
  isUsing: string;
  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.onLoadSticks();
    this.onLoadAllFacility();
  }
  onLoadSticks(facility: string = null, isAtive: string = null, isUsing: string = null) {
    this.apiService.getTicketCustomerHistory(facility, isAtive, isUsing).subscribe({
      next: (res) => {
        if (res.body?.length <= 0) return this.customerTickets = [];
        this.customerTickets = res.body
        this.customerTickets = this.customerTickets.map(e => {
          e.price = (+e.price).toLocaleString('en-US', { style: 'currency', currency: 'VND' });
          return e;
        });
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }
  handleSelectFacility(e) {
    this.facilityId = e.target.value == 'all' ? null : e.target.value
    this.onLoadSticks(this.facilityId, this.isActive, this.isUsing)
  }
  handleSelectStatus(e) {
    this.isActive = e.target.value == 'all' ? null : e.target.value
    this.onLoadSticks(this.facilityId, this.isActive, this.isUsing)
  }
  handleSelectUsingStatus(e) {
    this.isUsing = e.target.value == 'all' ? null : e.target.value
    this.onLoadSticks(this.facilityId, this.isActive, this.isUsing)
  }
  onLoadAllFacility() {
    this.apiService.getAllFacility().subscribe({
      next: (res) => {
        if(!res.body) return this.facilities = [];
        this.facilities = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

  formatDateDdMmYyyy(value) {
    return formatDate(value, 'dd/MM/yyyy', 'en-US');
  }

  using(username) {
    console.info(username)
    this.apiService.changeCustomerTicketUsing(username).subscribe({
      next: (res) => {
        this.customerTickets.map(x => {
          if (x.customer.username === username) {
            x.isUsing = !x.isUsing
          }
        })
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }
}
