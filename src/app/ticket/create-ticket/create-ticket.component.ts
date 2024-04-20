import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { scrollToFirstInvalidControl, validateAllFormFields, validateForm } from 'src/app/functions/function-helper';
import { ApiService } from 'src/app/services/services/api.service';


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
  // imports: [CommonModule]
})

export class CreateTicketComponent implements OnInit {
  ticketForm: FormGroup;
  facilityList : any = [];
  validateForm = validateForm;
  me: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    public location: Location,
    private _formBuilder: FormBuilder,
  ) {
    this.ticketForm = this.createTicketForm();

   }
   createTicketForm  = ():FormGroup => {
    return this._formBuilder.group({
      name: [null, [Validators.required]],
      monthDuration: [null,[Validators.required]],
      price: [null,[Validators.required]],
      description: [null],
      facility: [1,[Validators.required]]
    })
   }
   saveForm() {
    this.ticketForm.value.facility = {
      id : this.ticketForm.value.facility ? this.ticketForm.value.facility : this.me.facility.id
    }
    if (this.ticketForm.valid) {
      this.ticketForm.value.price = +this.ticketForm.value.price.replace('.', '');
      this.apiService.createTicketAdmin(this.ticketForm.value).subscribe({
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
      validateAllFormFields(this.ticketForm);
      scrollToFirstInvalidControl(this.ticketForm);
    }
   }
  ngOnInit() {
    this.onLoadMe();
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
  onLoadMe() {
    this.apiService.me().subscribe({
      next: (res) => {
        this.me = res.body
        if (res.body.role.id !== 1) {
          this.ticketForm.controls['facility'].disable();
          this.ticketForm.patchValue({
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
