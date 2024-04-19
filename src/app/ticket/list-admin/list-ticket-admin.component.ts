import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/services/api.service';


@Component({
  selector: 'app-list-ticket-admin',
  templateUrl: './list-ticket-admin.component.html',
  styleUrls: ['./list-ticket-admin.component.scss'],
  // imports: [CommonModule]
})

export class ListTicketAdComponent implements OnInit {
  focus: any;
  focus1: any;
  value = '';
  listTickets: any = [];
  facilityList: any = [];
  facilitySelect: string;
  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.onLoadSticks();
    this.onLoadAllFacility();
    this.value = 'default';
  }
  onLoadSticks(facility: number = null) {
    this.apiService.getSticketAdmin(facility).subscribe({
      next: (res) => {
        if (res.body?.length <= 0) return this.listTickets = [];
        this.listTickets = res.body
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
  selectedOption(string: string) {
    this.value = string;
  }

  viewAll() {

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

  edit(id: any) {

  }

  add() {
    this.router.navigate(['/admin/create-ticket']);
  }
}
