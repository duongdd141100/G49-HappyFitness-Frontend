import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleComponent } from '../schedules/schedule.component';


@Component({
  selector: 'view-class-admin.component',
  templateUrl: './view-class-admin.component.html',
  styleUrls: ['./view-class-admin.component.scss'],
  // imports: [CommonModule]
})

export class ViewClassAdComponent implements OnInit {
  classes: any = [];
  facilityList: any = [];
  facilitySelect: string;
  trainSchedules: any = [];
  constructor(
    private router: Router,
    private apiService: ApiService,
    private _modal: NgbModal,
  ) { }

  ngOnInit() {
    this.onLoadClasses();
    this.onLoadAllFacility();
  }
  onLoadClasses() {
    this.apiService.getClasses().subscribe({
      next: (res) => {
        if (res.body?.length <= 0) return this.classes = [];
        this.classes = res.body;
        this.trainSchedules = res.body.trainSchedules;
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }
  handleSelectFacility(e) {
    let value = e.target.value
    value == 'all' ? this.onLoadClasses() : this.onLoadClasses()
  }
  onLoadAllFacility() {
    this.apiService.getAllFacility().subscribe({
      next: (res) => {
        if(!res.body) return this.facilityList = [];
        this.facilityList = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

  deactivate(id: any) {
    this.apiService.deactivateTicket(id).subscribe({
      next: (res) => {
        this.classes = this.classes.map(it => {
          if (it.id === id) {
            it.status = false
          }

          return it
        })
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }
  active(id: any) {
    this.apiService.activeTicket(id).subscribe({
      next: (res) => {
        this.classes = this.classes.map(it => {
          if (it.id === id) {
            it.status = true
          }

          return it
        })
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

  update(id: any) {
    this.router.navigate([`/admin/update-ticket/${id}`]);
  }

  add() {
    this.router.navigate(['/admin/create-ticket']);
  }

  getDayOfWeeksStr(id) {
    return this.classes.find(x => x.id === id).trainSchedules
    .map(schedule => {
      return schedule.dayOfWeek
    }).join(', ');
  }
  handleViewSchedule(c) {
    const modalRef = this._modal.open(ScheduleComponent, {
      //scrollable: true,
      size: 'lg', //'sm' | 'lg' | 'xl' | string;
      backdropClass: 'service-backdrop',
      windowClass: 'service-window',
      centered: true,
      backdrop : 'static',
      keyboard : false
    });
    modalRef.componentInstance.classId = c.id;
    modalRef.result.then(result => {
      this.onLoadClasses();
    }).catch(error => { return error })
  }
}
