import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // Import CommonModule ở đây
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { scrollToFirstInvalidControl, validateAllFormFields, validateForm } from 'src/app/functions/function-helper';
import { ApiService } from 'src/app/services/services/api.service';


@Component({
  selector: 'app-create-voucher',
  templateUrl: './create-voucher.component.html',
  styleUrls: ['./create-voucher.component.scss'],
  // imports: [CommonModule]
})

export class CreateVoucherComponent implements OnInit {
  voucherForm: FormGroup;
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
    this.voucherForm = this.createTicketForm();

   }
   createTicketForm  = ():FormGroup => {
    return this._formBuilder.group({
      name: [null, [Validators.required]],
      percentAmount: [null,[Validators.required]],
      maxMoneyAmount: [null,[Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null,[Validators.required]],
      description: [null]
    })
   }
   saveForm() {
    if (this.voucherForm.valid) {
      this.voucherForm.value.maxMoneyAmount = +this.voucherForm.value.maxMoneyAmount.replace('.', '');
      this.apiService.createVoucher(this.voucherForm.value).subscribe({
        next: (res) => {
          this.toastr.success('Tạo mã giảm giá thành công!');
          this.router.navigate(['/admin/vouchers']);
        }, // nextHandler
        error: (err) => {
          console.info(err)
          this.toastr.error('Tạo mã giảm giá thất bại!');
        }, // errorHandler
      })
    } else {
      validateAllFormFields(this.voucherForm);
      scrollToFirstInvalidControl(this.voucherForm);
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
