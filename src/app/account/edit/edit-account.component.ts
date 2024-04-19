import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // Import CommonModule ở đây
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { scrollToFirstInvalidControl, validateAllFormFields, validateForm } from 'src/app/functions/function-helper';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
  // imports: [CommonModule]
})

export class EditAccountComponent implements OnInit {
  userForm: FormGroup;
  value = '';
  note: any;
  nameNull = false;
  priceNull = false;
  product_name: any;
  product_price: any;
  selectedType: string; // Biến lưu trữ loại sanpham được chọn
  genderTypes: string[] = ["Male", "Female"];
  validateForm = validateForm
  facilities: any[];
  username: any;
  user: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    public location: Location,
    private route: ActivatedRoute,
  ) {
    this.userForm = this.creatUserForm();
  }
  creatUserForm(): FormGroup {
    return this._formBuilder.group({
      fullName: [null, [Validators.required]],
      username: [null,[Validators.required]],
      email: [null,[Validators.required]],
      password: [null,[Validators.required]],
      phoneNumber: [null,[Validators.required]],
      roleId: [null,[Validators.required]],
      gender: [null,[Validators.required]],
      dob: [null,[Validators.required]],
      facilityId: [null,[Validators.required]],
      address: [null,[Validators.required]],
    })
  }

  ngOnInit() {
    this.onLoadFacilities();
    this.username = this.route.snapshot.paramMap.get('username')
    this.onLoadUser();
    this.value = '';
    this.selectedType = this.genderTypes[0];
    this.product_name = '';
    this.product_price = '';
    this.note = ''
  }
  onLoadUser() {
    this.apiService.getUsers(null, this.username).subscribe({
      next: (res) => {
        if(!res.body) return this.user = [];
        this.user = res.body[0]
        this.userForm.patchValue({
          fullName: this.user.fullName,
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
          phoneNumber: this.user.phoneNumber,
          roleId: this.user.roleId,
          gender: this.user.gender,
          dob: this.user.dob,
          facilityId: this.user.facilityId,
          address: this.user.address,
        })
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

  selectedOption(string: string) {
    this.value = string;
  }

  viewAll() {

  }

  cancel() {

  }

  save() {
    this.toastr.success('Tạo sản phẩm thành công!');
    this.router.navigate(['/list-product']);
  }
  saveForm() {
    this.userForm.value.facility = {
      id : +this.userForm.value.facilityId
    }
    this.userForm.value.role = {
      id : +this.userForm.value.roleId
    }
    if (this.userForm.valid) {
      console.info(this.userForm.value)
      this.apiService.createUser(this.userForm.value).subscribe({
        next: (res) => {
          if (res.code !== 200)  return this.toastr.error('Tạo tài khoản thất bại!');
          this.toastr.success('Tạo tài khoản thành công!');
          this.router.navigate(['/admin/accounts']);
        }, // nextHandler
        error: (err) => {
          console.info(err)
          this.toastr.error(err.error.body);
        }, // errorHandler
      })
    } else {
      validateAllFormFields(this.userForm);
      scrollToFirstInvalidControl(this.userForm);
    }
   }
}
