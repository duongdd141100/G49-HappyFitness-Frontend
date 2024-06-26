import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/services/api.service';
import { AuthService } from 'src/app/services/services/auth.service';


@Component({
  selector: 'app-list-ticket-admin',
  templateUrl: './list-ticket-admin.component.html',
  styleUrls: ['./list-ticket-admin.component.scss'],
  // imports: [CommonModule]
})

export class ListTicketAdComponent implements OnInit {
  listTickets: any = [];
  facilityList: any = [];
  facilitySelect: string;
  me: any;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.onLoadSticks();
    this.onLoadAllFacility();
    this.onLoadMe();
  }
  onLoadMe() {
    this.authService.getOwnInfo().subscribe({
      next: (res) => {
        this.me = res.body
      }, // nextHandler
      error: (err) => {
      
        return
      }, // errorHandler
    })
  }
  onLoadSticks(facility: number = null) {
    this.apiService.getSticketAdmin(facility).subscribe({
      next: (res) => {
        if (res.body?.length <= 0) return this.listTickets = [];
        this.listTickets = res.body
        this.listTickets = this.listTickets.map(e => {
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
    let value = e.target.value
    value == 'all' ? this.onLoadSticks() : this.onLoadSticks(value)
  }
  onLoadAllFacility() {
    this.apiService.getAllFacility().subscribe({
      next: (res) => {
        if(!res.body) return this.facilityList = [];
        this.facilityList = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

  deactivate(id: any) {
    this.apiService.deactivateTicket(id).subscribe({
      next: (res) => {
        this.listTickets = this.listTickets.map(it => {
          if (it.id === id) {
            it.status = false
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
    this.apiService.activeTicket(id).subscribe({
      next: (res) => {
        this.listTickets = this.listTickets.map(it => {
          if (it.id === id) {
            it.status = true
          }

          return it
        })
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

  update(id: any) {
    this.router.navigate([`/admin/update-ticket/${id}`]);
  }

  add() {
    this.router.navigate(['/admin/create-ticket']);
  }
}
