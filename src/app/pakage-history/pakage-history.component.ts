import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/services/api.service';
import { sortIntoWeeks } from '../functions/function-helper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewScheduleByPakageComponent } from './view-schedule-by-pakage/view-schedule-by-pakage.component';

@Component({
  selector: 'app-pakage-history',
  templateUrl: './pakage-history.component.html',
  styleUrls: ['./pakage-history.component.scss']
})
export class PakageHistoryComponent implements OnInit {

  constructor(private apiService: ApiService, private _modal: NgbModal) { }
  pakageHistorys: any;
  ngOnInit(): void {
    this.onLoadPakageHistorys();
  }
  handeViewSchedule(p) {
    const modalRef = this._modal.open(ViewScheduleByPakageComponent, {
      //scrollable: true,
      size: 'lg', //'sm' | 'lg' | 'xl' | string;
      backdropClass: 'service-backdrop',
      windowClass: 'service-window',
      centered: true
    })
    modalRef.componentInstance.pakage = p
    modalRef.result.then(result => {
      if (!result) { return }
    }).catch(error => { return error })
    
   
  }
  // sortIntoWeeks(items: any[], startDate: Date): any[] {
  //   // Khởi tạo mảng kết quả
  //   const weeks = [];

  //   // Sắp xếp các buổi tập theo ngày tăng dần
  //   items.sort((a, b) => {
  //     return new Date(a.trainDate).getTime() - new Date(b.trainDate).getTime();
  //   });

  //   // Tính toán ngày bắt đầu của tuần
  //   const startOfWeek = new Date(startDate);
  //   startOfWeek.setHours(0, 0, 0, 0);
  //   startOfWeek.setDate(startDate.getDate() - startDate.getDay());

  //   // Duyệt qua từng buổi tập
  //   items.forEach(item => {
  //     // Lấy ngày của buổi tập
  //     const trainDate = new Date(item.trainDate);
      
  //     // Tính toán số ngày chênh lệch từ ngày bắt đầu đến ngày của buổi tập
  //     const diffDays = Math.floor((trainDate.getTime() - startOfWeek.getTime()) / (1000 * 3600 * 24));
      
  //     // Tính toán vị trí trong mảng tuần
  //     const weekIndex = Math.floor(diffDays / 7);
      
  //     // Tính toán vị trí trong mảng ngày trong tuần
  //     const dayIndex = trainDate.getDay();

  //     // Kiểm tra xem tuần hiện tại đã được tạo chưa
  //     if (!weeks[weekIndex]) {
  //       // Nếu tuần chưa được tạo, tạo mảng tuần mới
  //       weeks[weekIndex] = Array(7).fill(null);
  //     }

  //     // Thêm buổi tập vào tuần tương ứng
  //     weeks[weekIndex][dayIndex] = item;
  //   });

  //   return weeks;
  // }
  
  onLoadPakageHistorys() {
    this.apiService.getClasses().subscribe({
      next: (res) => {
        this.pakageHistorys = res.body
      }, // nextHandler
      error: (err) => {
        return 
      }, // errorHandler
    });
  }
}
