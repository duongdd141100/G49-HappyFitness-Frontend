import { filter } from 'rxjs';
import { sortIntoWeeksMultipleTrain } from './../functions/function-helper';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdatePtClassComponent } from './update-pt-class/update-pt-class.component';

@Component({
  selector: 'app-schedule-admin-pt',
  templateUrl: './schedule-admin-pt.component.html',
  styleUrls: ['./schedule-admin-pt.component.scss']
})
export class ScheduleAdminPTComponent implements OnInit {
  scheduleWeeks:any = [];
  scheduleWeeksOne:any;
  timeTrain:any;
  dayByWeek: any;
  constructor(private apiService: ApiService, private toast:ToastrService, private router: Router, private _modal: NgbModal) { }

  ngOnInit(): void {
    this.onLoadSchedule();
    this.onLoadTimeTrain();
  }
  onLoadSchedule() {
    this.apiService.getSchedules().subscribe({
      next: (res) => {
        this.scheduleWeeks = sortIntoWeeksMultipleTrain(res.body, new Date(res.body[0].createdDate), new Date());
        this.scheduleWeeks = this.scheduleWeeks.filter(week => week);
        this.scheduleWeeksOne = this.getCurrentWeek() ? this.getCurrentWeek() : this.scheduleWeeks[0] || this.scheduleWeeks[1];
        this.getWeekAndDayByWeek();
      }, // nextHandler
      error: (err) => {
        if(err.status  === 401) {
          this.toast.error('Vui lòng đăng nhập!');
          this.router.navigate(['/login']);
        }
        return 
      }, // errorHandler
    });
  }
  onCheckTimeTrain(id, schedules) {
    let scheduleList = schedules.filter(s => s && s.trainTime.id == id);
    if (scheduleList.length <= 0 || !scheduleList) {
      return [];
    } else {
      return scheduleList
    }
  }
  getDayByWeek(week) {
    return week.filter(item => item !== null && item && item.length > 0)[0][0].trainDate;
  }
  getWeekAndDayByWeek() {
    this.scheduleWeeksOne = this.scheduleWeeksOne.slice(1);
    this.dayByWeek = this.getWeekSchedule(this.getDayByWeek(this.scheduleWeeksOne));
  }
  onLoadTimeTrain() {
    this.apiService.getTimeTrain().subscribe({
      next: (res) => {
        this.timeTrain = res.body
      }, // nextHandler
      error: (err) => {
        
        return
      }, // errorHandler
    })
  }
  onCheckCurrentDay(week) {
    for (const train of week) {
      if (train && train.length > 0 && train.some(item => item && item.currentWeek)) {
        // Nếu có, trả về tuần này
        return true;
      }
    }
    // Nếu không tìm thấy tuần nào có thuộc tính currentWeek, trả về null hoặc thực hiện xử lý phù hợp với trường hợp này
    return false;
}
  handleUpdatePT1N(schedule) {
    if (schedule.clazz.type !== 'ONE_ON_MANY') return;
    const modalRef = this._modal.open(UpdatePtClassComponent, {
      //scrollable: true,
      size: 'md', //'sm' | 'lg' | 'xl' | string;
      backdropClass: 'service-backdrop',
      windowClass: 'service-window',
      centered: true
    })
    modalRef.componentInstance.schedule = schedule
    modalRef.result.then(result => {
      if (!result) { return }
      this.onLoadSchedule();
    }).catch(error => { return error })
  }
  onChangeWeek(index){  
    this.scheduleWeeksOne = this.scheduleWeeks[index];
    this.getWeekAndDayByWeek();
  }
  formatTime(time) {
    const timeString = time //"08:00:00";
    const timeParts = timeString.split(":");
    const hour = timeParts[0];
    const minute = timeParts[1];
    return hour+':'+minute
  }
  getDayWithWeek(week) {
    let dayWeek = this.getWeekSchedule(this.getDayByWeek(week));
    return [
      dayWeek[0].dayTime,
      dayWeek[6].dayTime
    ]
  }
  getWeekSchedule(startDay) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const schedule = [];

    // Chuyển đổi ngày bắt đầu thành đối tượng Date
    const startDate = new Date(startDay);
    // Tính toán index của ngày trong tuần (0-6)
    const startDayIndex = startDate.getDay();

    // Tính toán số ngày cần thêm hoặc trừ để đi đến ngày thứ 2 của tuần
    const daysToAdd = startDayIndex === 0 ? 1 : -(startDayIndex - 1);

    // Lặp qua từng ngày trong tuần, bắt đầu từ thứ 2 (index 1)
    for (let i = 1; i <= 7; i++) {
        const currentDay = new Date(startDate);
        // Thêm số ngày tương ứng để chuyển sang ngày tiếp theo trong tuần
        currentDay.setDate(startDate.getDate() + daysToAdd + i - 1);
        
        // Tạo đối tượng chứa thông tin về thứ và ngày của tuần
        const dayInfo = {
            rank: i,
            dayTime: currentDay
        };
        
        // Thêm vào mảng lịch
        schedule.push(dayInfo);
    }

    return schedule;
}
  getCurrentWeek(): any {
    // Duyệt qua mảng các tuần đã tạo
    for (const week of this.scheduleWeeks) {
      if (week && week.length > 0) {
        for (const train of week) {
          if (train && train.some(item => item && item.currentWeek)) {
            // Nếu có, trả về tuần này
            return week;
          }
        }
      }
      // Kiểm tra xem tuần này có thuộc tính currentWeek không
     
    }
    // Nếu không tìm thấy tuần nào có thuộc tính currentWeek, trả về null hoặc thực hiện xử lý phù hợp với trường hợp này
    return null;
  }
}
