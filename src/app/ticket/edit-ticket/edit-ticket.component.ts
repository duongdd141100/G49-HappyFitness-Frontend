import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // Import CommonModule ở đây
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { scrollToFirstInvalidControl, validateAllFormFields, validateForm } from 'src/app/functions/function-helper';
import { ApiService } from 'src/app/services/services/api.service';


@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss'],
  // imports: [CommonModule]
})

export class EditTicketComponent implements OnInit {
  ticketForm: FormGroup;
  value = '';
  id: any;
  facilityList : any = [];
  ticket: any;
  validateForm = validateForm
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    public location: Location,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.ticketForm = this.createTicketForm();

   }
  ngOnInit() {
    this.onLoadMe();
    this.id = this.route.snapshot.paramMap.get('id')
    this.loadTicket();
    this.apiService.getAllFacility().subscribe({
      next: (res) => {
        if(!res.body) return this.facilityList = [];
        this.facilityList = res.body
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
    this.value = 'default';
  }
  onLoadMe() {
    this.apiService.me().subscribe({
      next: (res) => {
        if (res.body.role.id !== 1) {
          this.ticketForm.controls['facility'].disable();
        }
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }
   createTicketForm  = ():FormGroup => {
    return this._formBuilder.group({
      name: [null, [Validators.required]],
      monthDuration: [null,[Validators.required]],
      price: [null,[Validators.required]],
      description: [null],
      facility: [null,[Validators.required]]
    })
   }
   saveForm() {
    this.ticketForm.value.facility = {
      id : this.ticketForm.value.facility 
        ? (this.ticketForm.value.facility.id ? this.ticketForm.value.facility.id : this.ticketForm.value.facility)
        : this.ticket.facility.id
    }
    if (this.ticketForm.valid) {
      this.ticketForm.value.price = +this.ticketForm.value.price.toString().replace('.', '');
      this.apiService.updateTicket(this.id, this.ticketForm.value).subscribe({
        next: (res) => {
          this.toastr.success('cập nhật vé thành công!');
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
  loadTicket() {
    this.apiService.findTicketDetail(this.id).subscribe({
      next: (res) => {
        if(!res.body) return this.ticket = [];
        this.ticket = res.body
        this.ticketForm.patchValue({
          name: this.ticket.name,
          monthDuration: this.ticket.monthDuration,
          price: this.ticket.price,
          description: this.ticket.description,
          facility: this.ticket.facility.id,
        });
      }, // nextHandler
      error: (err) => {
        console.info(err)
      }, // errorHandler
    })
  }

  selectedOption(string: string) {
    this.value = string;
  }
}
