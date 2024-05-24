import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentComponent implements OnInit {
  @Input() classStudents:any;
  constructor(private apiService: ApiService,
    public activeModal: NgbActiveModal,) { }
  schedules:any
  ngOnInit(): void {

  }
}
