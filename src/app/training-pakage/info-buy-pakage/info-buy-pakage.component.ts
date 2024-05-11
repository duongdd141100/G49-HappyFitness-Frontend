import { PopStateEvent } from '@angular/common';
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
    facilityId: null,
    mapDayOfWeekWithTrainTimeId: {},
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
  mapDayOfWeekWithTrainTimeId:any = {};
  thingSelect: any;
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
    if (this.mapDayOfWeekWithTrainTimeId[id]) return true;
    return false;
  }
  onFacilityChange(e) {
    if(e == 'null') {
      this.facilitySelect = null;
    } else {
      this.facilitySelect = +e;
      
    }
  }
  handleLoadPtFree(data) {
      this.apiService.getPtFree(data).subscribe({
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
    if(!this.facilitySelect || !this.onCheckListTimes()) {
      return this.toast.error('Vui lòng chọn đầy đủ thông tin!');
    }
    this.data.facilityId = this.facilitySelect;
    this.data.mapDayOfWeekWithTrainTimeId = this.mapDayOfWeekWithTrainTimeId
    let data = {
      facilityId: this.facilitySelect,
      mapDayOfWeekWithTrainTimeId: this.mapDayOfWeekWithTrainTimeId
    }
    this.handleLoadPtFree(data);
  }
  handleBack() {
    this.nextPT = false;
  }
  handleSelectTime(id) {
    if (this.mapDayOfWeekWithTrainTimeId[id]) {
      delete this.mapDayOfWeekWithTrainTimeId[id]
      if (this.thingSelect) {
        this.thingSelect = null;
      }
    } else {
      this.thingSelect = id;
    }
  }
  checkSelectThing(id) {
    if (this.mapDayOfWeekWithTrainTimeId[id] || this.thingSelect == id) {
      return true;
    } 
    return false;
  }
  handleCheckSelectTimeTrain(id) {
    if (this.mapDayOfWeekWithTrainTimeId[this.thingSelect] == id) {
      return true;
    }
    return false;
  }
  showTimeTrain(value) {
    let time = this.timeTrain.filter(time => time.id == value)[0];
    return this.formatTime(time.startTime) + ' - ' + this.formatTime(time.endTime);
  }
  formatObjectToArray(): Array<{key:number, value: number}> {
    return Object.keys(this.mapDayOfWeekWithTrainTimeId).map(key => {
      return { key: +key, value: this.mapDayOfWeekWithTrainTimeId[key] };
    });
  }
  onCheckListTimes() {
    if (Object.keys(this.mapDayOfWeekWithTrainTimeId).length > 0) {
      return true;
    }
    return false;
  }
  handleSelectTimeTrain(id) {
    this.mapDayOfWeekWithTrainTimeId[this.thingSelect] = id; 
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
