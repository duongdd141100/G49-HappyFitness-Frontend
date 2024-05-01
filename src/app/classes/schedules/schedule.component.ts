import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() classId:any;
  constructor(private apiService: ApiService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,) { }
  schedules:any
  ngOnInit(): void {
    if (this.classId) this.onLoadOrderDetail()
  }
  onLoadOrderDetail() {
    this.apiService.getSchedules(this.classId).subscribe({
      next: (res) => {
        this.schedules = res.body
      }, // nextHandler
      error: (err) => {
        
        return
      }, // errorHandler
    })
  }
  attend(scheduleId) {
    this.apiService.attend(scheduleId).subscribe({
      next: (res) => {
        this.schedules.map(x => {
          if (x.id === scheduleId) {
            x.status = 'ATTENDED';
          }
          return x;
        });
        this.toastr.success("Cập nhật thành công!")
      }, // nextHandler
      error: (err) => {
        
        return
      }, // errorHandler
    })
  }
}
