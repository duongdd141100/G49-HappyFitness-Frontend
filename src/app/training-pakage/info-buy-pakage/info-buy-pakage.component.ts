import { filter } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-buy-pakage',
  templateUrl: './info-buy-pakage.component.html',
  styleUrls: ['./info-buy-pakage.component.scss']
})
export class InfoBuyPakageComponent implements OnInit {
  @Input() package:any;
  facilities: any = [];
  data: any = {
    trainTimeId: null,
    facilityId: null,
    dayOfWeeks: [],
    ptId: null,
    packageId: null
  }
  nextPT: boolean = false
  timeTrain: any = [];
  facilitySelect: any;
  timeTrainSelect: any;
  Things: any = [
    {
      id: 2,
      label: 'Thứ 2'
    },
    {
      id: 3,
      label: 'Thứ 3'
    },
    {
      id: 4,
      label: 'Thứ 4'
    },
    {
      id: 5,
      label: 'Thứ 5'
    },
    {
      id: 6,
      label: 'Thứ 6'
    },
    {
      id: 7,
      label: 'Thứ 7'
    }
  ]
  timeSelect:Array<any> = [];
  PtFree: Array<any> = [];
  constructor(private apiService: ApiService, private toast: ToastrService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.data.packageId = this.package.id;
    this.apiService.getAllFacility().subscribe({
      next: (res) => {
        this.facilities = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
        return
      }, // errorHandler
    })
    this.onLoadTimeTrain();
  }
  handleCheckSelectTime(id): boolean {
    return this.timeSelect.some(item => item == id);
  }
  onFacilityChange(e) {
    if(e == 'null') {
      this.facilitySelect = null;
    } else {
      this.facilitySelect = +e;
      
    }
  }
  handleLoadPtFree() {
    if(this.checkDataRequired()) {
      this.apiService.getPtFree(this.data).subscribe({
        next: (res) => {
          if (res.body.length <= 0) return this.toast.error('Hiện tại không có huấn luận viên nào rãnh với thời gian trên.');
          this.nextPT = true;
          this.PtFree = res.body;
        }, // nextHandler
        error: (err) => {
          
          return
        }, // errorHandler
      })
    }
  }
  checkDataRequired() {
    if(!this.facilitySelect || this.timeSelect.length <= 0 || !this.timeTrainSelect) {
      return false;
    }  else {
      return true;
    }
  }
  handleBuyPakage() {
    if(!this.data.ptId) return this.toast.error('Vui lòng chọn huấn luận viên!');
    this.apiService.createPayment(this.package.price, null, null ,this.data).subscribe({
      next: (res) => {
        window.open(res.body, '_blank');
        this.activeModal.close();
      }, // nextHandler
      error: (err) => {
        
        return
      }, // errorHandler
    })
    
  }
  handleSelectPT(pt) {
    if(this.data.ptId == pt.id) return this.data.ptId = null;
    this.data.ptId = pt.id;
  }
  handleNextPt() {
    if(!this.facilitySelect || this.timeSelect.length <= 0 || !this.timeTrainSelect) {
      return this.toast.error('Vui lòng chọn đầy đủ thông tin!');
    }
      this.data.trainTimeId = this.timeTrainSelect;
      this.data.facilityId = this.facilitySelect;
      this.data.dayOfWeeks = this.timeSelect;
      this.handleLoadPtFree();
  }
  handleBack() {
    this.nextPT = false;
  }
  handleSelectTime(id) {
    if(this.handleCheckSelectTime(id)) {
      this.timeSelect = this.timeSelect.filter(idTime => idTime !== id)
    } else {
      this.timeSelect.push(id)
    }
    this.timeSelect = this.timeSelect.sort((a, b) => a - b)
    
  }
  handleCheckSelectTimeTrain(id) {
    return id === this.timeTrainSelect;
  }
  handleSelectTimeTrain(id) {
    if(this.timeTrainSelect == id) return this.timeTrainSelect = null;
    this.timeTrainSelect = id;
    
  }
  formatTime(time) {
    const timeString = time //"08:00:00";
    const timeParts = timeString.split(":");
    const hour = timeParts[0];
    const minute = timeParts[1];
    return hour+':'+minute
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
