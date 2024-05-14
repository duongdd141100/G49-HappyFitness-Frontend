import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-update-schedule-modal',
  templateUrl: './update-schedule-modal.component.html',
  styleUrls: ['./update-schedule-modal.component.scss']
})
export class UpdateScheduleModalComponent implements OnInit {
  @Input() schedule: any;
  timeTrain: any;
  timeTrainSelect: any;
  timeNextSelect: any;
  minDate: string;

  constructor(private apiService: ApiService, private toast: ToastrService, private modal: NgbActiveModal) { }

  ngOnInit(): void {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(0, 0, 0, 0);
    this.minDate = currentDate.toISOString().split('T')[0];
    this.timeTrainSelect = this.schedule.trainTime.id;
    this.timeNextSelect= this.schedule.trainDate
    this.onLoadTimeTrain();
  }
  handleSelectTimeTrain(idTime) {
    this.timeTrainSelect = idTime;
  }
  formatTime(time) {
    const timeString = time //"08:00:00";
    const timeParts = timeString.split(":");
    const hour = timeParts[0];
    const minute = timeParts[1];
    return hour+':'+minute
  }
  handleSaveForm() {
    if (!this.timeNextSelect) {
      return this.toast.error('Vui lòng chọn thời gian muốn chuyển đến!');
    }
    if (this.timeNextSelect == this.schedule.trainDate && this.timeTrainSelect == this.schedule.trainTime.id) {
      return this.toast.error('Thời gian chưa thay đổi!');
    }
    let data = {
      id: this.schedule.id,
      trainDate: this.timeNextSelect,
      trainTime: {
        id: +this.timeTrainSelect
      }
    }
    this.apiService.updateSchedule(data).subscribe({
      next: (res) => {
        this.modal.close(true);
      }, // nextHandler
      error: (err) => {
        
        return
      }, // errorHandler
    })
    
  }
  changeDate(e) {
    this.timeNextSelect = e;
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
