import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @Input() scheduleId: any;
  @Input() classStudents: any;
  attendances: any;
  constructor(private apiService: ApiService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,) { }
  schedules:any
  ngOnInit(): void {
    this.onLoadAttendance();
  }
  onLoadAttendance() {
    this.apiService.getAttendance(this.scheduleId).subscribe({
      next: (res) => {
        this.attendances = res.body
        this.attendances.map(x => {
          if (x.status === 'ATTENDED') {
            x.statusCheckbox = true;
          } else {
            x.statusCheckbox = false;
          }
          return x;
        })
      }, // nextHandler
      error: (err) => {
        
        return
      }, // errorHandler
    })
  }
  attend(s) {
    this.apiService.attend(this.scheduleId, s.student.id).subscribe({
      next: (res) => {
        this.schedules.map(x => {
          // if (x.id === scheduleId) {
          //   x.status = 'ATTENDED';
          // }
          return x;
        });
        this.toastr.success("Cập nhật thành công!")
      }, // nextHandler
      error: (err) => {
        
        return
      }, // errorHandler
    })
  }
  save() {
    this.attendances.map(x => {
      if (x.statusCheckbox) {
        if (x.status === 'NOT_YET' || x.status === 'ABSENT') {
          x.classStudent.remainSlot = x.classStudent.remainSlot - 1;
        }
        x.status = 'ATTENDED';
      } else {
        if (x.status === 'ATTENDED') {
          x.classStudent.remainSlot = x.classStudent.remainSlot + 1;
        }
        x.status = 'ABSENT';
      }
      return x;
    })
    this.apiService.updateAttend(this.attendances).subscribe({
      next: (res) => {
        this.toastr.success("Cập nhật thành công!")
      }, // nextHandler
      error: (err) => {
        
        return
      }, // errorHandler
    })
  }
}
