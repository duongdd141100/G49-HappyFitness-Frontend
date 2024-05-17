import { filter } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { sortIntoWeeks, sortIntoWeeksMultipleTrain } from 'src/app/functions/function-helper';
import { ApiService } from 'src/app/services/services/api.service';
import { AuthService } from 'src/app/services/services/auth.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateScheduleModalComponent } from '../update-schedule-modal/update-schedule-modal.component';

@Component({
  selector: 'app-view-schedule-by-pakage',
  templateUrl: './view-schedule-by-pakage.component.html',
  styleUrls: ['./view-schedule-by-pakage.component.scss']
})
export class ViewScheduleByPakageComponent implements OnInit {
  @Input() pakage: any;
  timeTrain:any;
  scheduleWeeksOne: any;
  typeClass: any = {
    one_on_one: 'ONE_ON_ONE',
    one_on_many: 'ONE_ON_MANY'
  }
  selectWeekIndex: number;
  scheduleWeeks: any;
  dayByWeek:any;
  @Input() user: any;
  constructor(private apiService: ApiService,private _modal: NgbModal, private authService: AuthService, private modal:NgbActiveModal, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.onLoadSchedule();
    this.onLoadTimeTrain();
  }
  onLoadSchedule() {
    this.apiService.getSchedules(this.pakage.id).subscribe({
      next: (res) => {
        this.scheduleWeeks = sortIntoWeeksMultipleTrain(res.body, new Date(this.pakage.createdDate), new Date())
        this.scheduleWeeks = this.scheduleWeeks.filter(week => week);
        if ((this.selectWeekIndex && this.scheduleWeeksOne.length > 0) || (this.selectWeekIndex == 0 && this.scheduleWeeksOne.length > 0)) {
          if(this.scheduleWeeksOne.filter(schedule => schedule.length > 0).length >= 1) {
            this.scheduleWeeksOne = this.scheduleWeeks[this.selectWeekIndex]
          } else {
            this.scheduleWeeksOne = this.getCurrentWeek() ? this.getCurrentWeek() : this.scheduleWeeks[0] || this.scheduleWeeks[1];
          }
        } else {
          this.scheduleWeeksOne = this.getCurrentWeek() ? this.getCurrentWeek() : this.scheduleWeeks[0] || this.scheduleWeeks[1];
        }
        if(!this.selectWeekIndex) this.selectWeekIndex = this.scheduleWeeks.indexOf(this.scheduleWeeksOne)
        this.getWeekAndDayByWeek();
       
      }, // nextHandler
      error: (err) => {
        if(err.status  === 401) {
          this.modal.close();
          this.toast.error('Vui lòng đăng nhập!');
          this.router.navigate(['/login']);
        }
        return 
      }, // errorHandler
    });
  }
  onStatusOneOnOne(schedule) {
    if (schedule.clazz.type == this.typeClass.one_on_one) {
      return schedule.attendances[0].status
    } else {
      if (this.user && schedule ) {
       return schedule.attendances.filter(at => at.classStudent.student.id == this.user.id)[0].status
      }
    }
    return 'Có vấn đề!'
  }
  onCheckTimeTrain(id, schedules) {
    let scheduleList = schedules.filter(s => s && s.trainTime.id == id);
    if (scheduleList.length <= 0 || !scheduleList) {
      return [];
    } else {
      return scheduleList
    }
  }
  getWeekAndDayByWeek() {
    this.scheduleWeeksOne = this.scheduleWeeksOne.slice(1);
    this.dayByWeek = this.getWeekSchedule(this.getDayByWeek(this.scheduleWeeksOne));
  }
  handleUpdateSchedule(s) {
    if (s.clazz.type != 'ONE_ON_ONE') {
      return
    }
    if (s.status != 'NOT_YET') {
      return this.toast.error('Buổi tập đã tham gia! Không thể cập nhật');
    }
    const modalRef = this._modal.open(UpdateScheduleModalComponent, {
      //scrollable: true
      size: 'md', //'sm' | 'lg' | 'xl' | string;
      backdropClass: 'service-backdrop',
      windowClass: 'service-window',
      centered: true
    })
    modalRef.componentInstance.schedule = s
    modalRef.result.then(result => {
      if (!result) { return }
      this.onLoadSchedule();
      this.toast.success('Cập nhật lịch hẹn thành công!');
    }).catch(error => { return error })
  }
  getDayByWeek(week) {
    return week.filter(item => item !== null && item && item.length > 0)[0][0].trainDate;
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
  onCheckCurrentDay(week, current?:boolean) {
    if (!current && this.selectWeekIndex && this.scheduleWeeks.indexOf(week) == this.selectWeekIndex) {
      return true;
    } else {
      if (!current) {
        return false;
      }
    }
    for (const train of week) {
      if (train && train.length > 0 && train.some(item => item && item.currentWeek)) {
        // Nếu có, trả về tuần này
        return true;
      }
    }
    // Nếu không tìm thấy tuần nào có thuộc tính currentWeek, trả về null hoặc thực hiện xử lý phù hợp với trường hợp này
    return false;
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
  formatTime(time) {
    const timeString = time //"08:00:00";
    const timeParts = timeString.split(":");
    const hour = timeParts[0];
    const minute = timeParts[1];
    return hour+':'+minute
  }
  onChangeWeek(index){  
    this.selectWeekIndex = index;
    this.scheduleWeeksOne = this.scheduleWeeks[index];
    this.getWeekAndDayByWeek();
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
}
