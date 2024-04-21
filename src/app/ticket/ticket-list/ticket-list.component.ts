import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule ở đây
import { MatSliderModule } from '@angular/material/slider';
import { ApiService } from 'src/app/services/services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  // imports: [CommonModule]
})

export class TicketListComponent implements OnInit {
  focus: any;
  focus1: any;
  selectedFacility:any;
  facilities: any;
  value = '';
  tickets:any;
  ticketList: { image: string; title: string; price: string; location: string; }[];
  priceRange: number = 0; // Giá trị ban đầu của priceRange

  constructor(private apiService: ApiService,private router: Router) { }

  ngOnInit() {
    this.apiService.getAllFacility().subscribe({
      next: (res) => {
        this.facilities = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
        return
      }, // errorHandler
    })
    this.onLoadTickets(null);
  }
  onLoadTickets(facilityId) {
    this.apiService.getSticketAdmin(facilityId).subscribe({
      next: (res) => {
        this.tickets = this.seperateProductByRows(res.body, 4)
      }, // nextHandler
      error: (err) => {
        console.info(err)
        return
      }, // errorHandler
    })
  }
  seperateProductByRows (products, rowSize) {
    const result: any[][] = [];
    for (let i = 0; i < products.length; i += rowSize) {
        if (products[i].status) {
          result.push(products.slice(i, i + rowSize));
        }
        
    }
    return result;
  }
  onFacilityChange(value) {
    if(value == 'all') {
      this.onLoadTickets(null);
    } else {
      this.onLoadTickets(+value);
    }
    
  }
  selectedOption(string: string) {
    this.value = string;
  }

  viewAll() {

  }

  chunkArray(array: any[], chunkSize: number): any[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  handleCardClick(ticket) {
    sessionStorage.setItem('ticketBuys', JSON.stringify([ticket]));
    this.router.navigate([`/order-checkout-ticket`])
  }
  // Phương thức lọc dựa trên khoảng giá
  filterByPrice() {
    // Thực hiện logic lọc dựa trên this.priceRange
    // Ví dụ:
    // Nếu this.priceRange = 5000000, bạn có thể lọc các phần tử có giá từ 0 đến 5,000,000đ
    // Nếu this.priceRange = 10000000, bạn có thể lọc tất cả các phần tử với giá từ 0 đến 10,000,000đ
  }
}
