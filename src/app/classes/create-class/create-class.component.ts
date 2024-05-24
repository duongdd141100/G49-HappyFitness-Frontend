import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { scrollToFirstInvalidControl, validateAllFormFields, validateForm } from 'src/app/functions/function-helper';
import { ApiService } from 'src/app/services/services/api.service';


@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss'],
  // imports: [CommonModule]
})

export class CreateClassComponent implements OnInit {
  classForm: FormGroup;
  facilities : any = [];
  trainTimes : any = [];
  validateForm = validateForm;
  me: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    public location: Location,
    private _formBuilder: FormBuilder,
  ) {
    this.classForm = this.createTicketForm();

   }
   createTicketForm  = ():FormGroup => {
    return this._formBuilder.group({
      name: [null, [Validators.required]],
      trainTimeId: [null,[Validators.required]],
      facilityId: [null,[Validators.required]],
      ptId: [null, [Validators.required]]
    })
   }
   saveForm() {
    this.classForm.value.facility = {
      id : this.classForm.value.facilityId ? this.classForm.value.facilityId : this.me.facility.id
    }
    if (this.classForm.valid) {
      this.classForm.value.price = +this.classForm.value.price.replace('.', '');
      this.apiService.createTicketAdmin(this.classForm.value).subscribe({
        next: (res) => {
          if (res.code !== 200)  return this.toastr.error('Tạo vé thất bại!');
          this.toastr.success('Tạo vé thành công!');
          this.router.navigate(['/admin/tickets']);
        }, // nextHandler
        error: (err) => {
          console.info(err)
          this.toastr.error('Tạo vé thất bại!');
        }, // errorHandler
      })
    } else {
      validateAllFormFields(this.classForm);
      scrollToFirstInvalidControl(this.classForm);
    }
   }
  ngOnInit() {
    this.onLoadMe();
    this.onLoadFacilities();
    this.onLoadTrainTimes();
  }
  onLoadTrainTimes() {
    this.apiService.getTimeTrain().subscribe({
      next: (res) => {
        if(!res.body) return this.facilities = [];
        this.trainTimes = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }
  onLoadFacilities() {
    this.apiService.getAllFacility().subscribe({
      next: (res) => {
        if(!res.body) return this.facilities = [];
        this.facilities = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }
  onLoadMe() {
    this.apiService.me().subscribe({
      next: (res) => {
        this.me = res.body
        if (res.body.role.id !== 1) {
          this.classForm.controls['facility'].disable();
          this.classForm.patchValue({
            facility: res.body.facility.id,
          });
        }
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

}
