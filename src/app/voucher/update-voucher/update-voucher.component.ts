import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate, Location } from '@angular/common'; // Import CommonModule ở đây
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { scrollToFirstInvalidControl, validateAllFormFields, validateForm } from 'src/app/functions/function-helper';
import { ApiService } from 'src/app/services/services/api.service';


@Component({
  selector: 'app-update-voucher',
  templateUrl: './update-voucher.component.html',
  styleUrls: ['./update-voucher.component.scss'],
  // imports: [CommonModule]
})

export class UpdateVoucherComponent implements OnInit {
  voucherForm: FormGroup;
  validateForm = validateForm;
  id: any;
  voucher: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    public location: Location,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
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
      this.apiService.updateVoucher(this.voucherForm.value, this.id).subscribe({
        next: (res) => {
          this.toastr.success('Cập nhật mã giảm giá thành công!');
          this.router.navigate(['/admin/vouchers']);
        }, // nextHandler
        error: (err) => {
          console.info(err)
          this.toastr.error('Cập nhật mã giảm giá thất bại!');
        }, // errorHandler
      })
    } else {
      validateAllFormFields(this.voucherForm);
      scrollToFirstInvalidControl(this.voucherForm);
    }
   }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.onLoadVoucher();
  }
  onLoadVoucher() {
    this.apiService.findAllVoucher(this.id).subscribe({
      next: (res) => {
        this.voucher = res.body[0];
        this.voucherForm.patchValue({
          name: this.voucher.name,
          percentAmount: this.voucher.percentAmount,
          maxMoneyAmount: this.voucher.maxMoneyAmount,
          startDate: this.formatDateDdMmYyyy(this.voucher.startDate),
          endDate: this.formatDateDdMmYyyy(this.voucher.endDate),
          description: this.voucher.description,
        });
      }, // nextHandler
      error: (err) => {
        this.toastr.error(err.error.body);
      }, // errorHandler
    })
  }
  formatDateDdMmYyyy(value) {
    return formatDate(value, 'yyyy-MM-dd', 'en-US');
  }
}
