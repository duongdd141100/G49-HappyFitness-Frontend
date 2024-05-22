import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-update-pt-class',
  templateUrl: './update-pt-class.component.html',
  styleUrls: ['./update-pt-class.component.scss']
})
export class UpdatePtClassComponent implements OnInit {
  @Input() schedule:any;
  PTs: any;
  ptSelectId: any;
  constructor(private apiService: ApiService, private toast: ToastrService, private modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.onLoadFreePt()
  }
  handleSelectPt(pt) {
    this.ptSelectId = pt
  }
  handleSaveForm() {
    if (!this.ptSelectId) return this.toast.error('Vui lòng chọn PT muốn thay đổi!');
    let data = {
      id: this.schedule.id,
      trainDate: this.schedule.trainDate,
      trainTime: {
        id: this.schedule.trainTime.id
      },
      pt: {
        id: +this.ptSelectId
    }
    }
    this.apiService.updateSchedule(data).subscribe({
      next: (res) => {
        this.toast.success('Cập nhật lịch thành công!');
        this.modal.close(true);
      }, // nextHandler
      error: (err) => {
        
        return
      }, // errorHandler
    })
  }
  onLoadFreePt() {
    let mapDayOfWeekWithTrainTimeId = {}
    mapDayOfWeekWithTrainTimeId[this.schedule.dayOfWeek] = this.schedule.trainTime.id
    let data = {
      facilityId: this.schedule.pt.facility.id,
      mapDayOfWeekWithTrainTimeId: mapDayOfWeekWithTrainTimeId
    }
    this.apiService.getPtFree(data).subscribe({
      next: (res) => {
        if (res.body.length <= 0) {
          this.modal.close(true);
          return this.toast.error('Hiện tại không có huấn luận viên nào rãnh trong buổi đó.');
        }
        this.PTs = res.body
      }, // nextHandler
      error: (err) => {
        
        return
      }, // errorHandler
    })
  }
}
