import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/services/api.service';
import { AttendanceComponent } from '../attendance/attendance.component';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() classId:any;
  constructor(private apiService: ApiService,
    public activeModal: NgbActiveModal,
    private _modal: NgbModal,
    ) { }
  schedules:any
  ngOnInit(): void {
    if (this.classId) this.onLoadSchedules()
  }
  onLoadSchedules() {
    this.apiService.getSchedules(this.classId).subscribe({
      next: (res) => {
        this.schedules = res.body
      }, // nextHandler
      error: (err) => {
        
        return
      }, // errorHandler
    })
  }
  attend(s) {
    const modalRef = this._modal.open(AttendanceComponent, {
      //scrollable: true,
      size: 'lg', //'sm' | 'lg' | 'xl' | string;
      backdropClass: 'service-backdrop',
      windowClass: 'service-window',
      centered: true,
      backdrop : 'static',
      keyboard : false
    });
    modalRef.componentInstance.scheduleId = s.id;
    modalRef.componentInstance.classStudents = s.clazz.classStudents;
    modalRef.result.then(() => this.onLoadSchedules());
  }
  trainDateIsToday(s) {
    return s.trainDate === formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }
}
