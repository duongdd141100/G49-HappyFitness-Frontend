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

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.apiService.getSticketAdmin().subscribe({
      next: (res) => {
        if (res.body?.length <= 0) return this.listTickets = [];
        this.listTickets = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
    this.value = 'default';
  }

  selectedOption(string: string) {
    this.value = string;
  }

  viewAll() {

  }

  delete(id: any) {

  }

  edit(id: any) {

  }

  add() {
    this.router.navigate(['/list-product']);
  }
}
