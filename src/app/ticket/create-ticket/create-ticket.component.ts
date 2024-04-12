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
  focus: any;
  focus1: any;
  ticketForm: FormGroup;
  value = '';
  note: any;
  nameNull = false;
  priceNull = false;
  quantityNull = false;
  ticket_name: any;
  ticket_price: any;
  ticket_quantity: any;
  selectedType: string; // Biến lưu trữ loại sanpham được chọn
  timeTypes: string[] = ["1 Year", "2 Years", "3 Years"];
  facilityList : any = [];
  validateForm = validateForm
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
      id : +this.ticketForm.value.facility
    }
    if (this.ticketForm.valid) {
      this.ticketForm.value.price = +this.ticketForm.value.price.replace('.', '');
      this.apiService.createTicketAdmin(this.ticketForm.value).subscribe({
        next: (res) => {
          if (res.code !== 200)  return this.toastr.error('Tạo vé thất bại!');
          this.toastr.success('Tạo vé thành công!');
          this.router.navigate(['/admin/ticket-list-ad']);
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
    this.selectedType = this.timeTypes[0];
  }

  selectedOption(string: string) {
    this.value = string;
  }

  viewAll() {

  }

  cancel() {

  }

  save() {
    this.toastr.success('Tạo vé thành công!');
  
  }
}
