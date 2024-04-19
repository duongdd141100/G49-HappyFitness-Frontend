import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/services/api.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-list-ticket-admin',
  templateUrl: './facility-view.component.html',
  styleUrls: ['./facility-view.component.scss'],
  // imports: [CommonModule]
})

export class FacilityViewAdminComponent implements OnInit {
  focus: any;
  focus1: any;
  value = '';
  facilities: any = [];
  facilitySelect: string;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.onLoadAllFacility();
    this.value = 'default';
  }
  handleSelectFacility(e) {
    let value = e.target.value
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
  selectedOption(string: string) {
    this.value = string;
  }

  viewAll() {

  }

  update() {
    this.toastr.error('Tác vụ chưa được thực hiện');
  }

  edit(id: any) {

  }

  add() {
    this.router.navigate(['/admin/create-ticket']);
  }
}
