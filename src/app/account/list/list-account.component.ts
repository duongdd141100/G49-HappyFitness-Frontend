import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/services/api.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss'],
  // imports: [CommonModule]
})

export class ListAccountComponent implements OnInit {
  focus: any;
  focus1: any;
  value = '';
  users: any = [];
  roleSelect: string;
  mapRole: any = new Map<string, string>();

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.mapRole.set('Admin', 'Admin');
    this.mapRole.set('Manager', 'Quản lý');
    this.mapRole.set('Customer', 'Khách hàng');
    this.mapRole.set('Receptionist', 'Lễ tân');
    this.mapRole.set('Personal Trainer', 'Huấn luyện viên');
    this.onLoadUser();
  }
  onLoadUser(roleId: number = null) {
    this.apiService.getUsers(roleId).subscribe({
      next: (res) => {
        if(!res.body) return this.users = [];
        this.users = res.body
      }, // nextHandler
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }, // errorHandler
    })
  }

  // Phân chia mảng thành các nhóm 4 phần tử
  chunkArray(array, chunkSize) {
    let results = [];
    while (array.length) {
      results.push(array.splice(0, chunkSize));
    }
    return results;
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
    this.router.navigate(['admin/create-account']);
  }
  handleSelectRole(e) {
    let value = e.target.value
    value == 'all' ? this.onLoadUser() : this.onLoadUser(value)
  }
  formatDateDdMmYyyy(value) {
    return formatDate(value, 'dd/MM/yyyy', 'en-US');
  }
  mapToRoleNameVi(value) {
    return this.mapRole.get(value)
  }

  resetPassword(username) {
    this.apiService.resetPassword(username).subscribe({
      next: (res) => {
        this.toastr.success('Đặt lại mật khẩu thành công!');
      }, // nextHandler
      error: (err) => {
        console.info(err)
        // if (err.status === 401) {
        //   this.router.navigate(['/login']);
        // }
      }, // errorHandler
    })
  }
}
