import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/services/auth.service';
import { AIMenuModalComponent } from './ai-menu-modal/ai-menu-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  userForm: FormGroup;

  constructor(private authService: AuthService,private formBuilder: FormBuilder, private _modal: NgbModal) { }

  ngOnInit(): void {
    this.authService.getOwnInfo().subscribe({
      next: (res) => {
        console.log(res.body);
        console.log(this.user);
        
        this.user = res.body
        this.userForm = this.createFormUser();
      }, // nextHandler
      error: (err) => {
      
        return
      }, // errorHandler
    })
    
  }
  onSubmit() {
    console.log(this.userForm.value);
  }
  handleAI() {
    const modalRef = this._modal.open(AIMenuModalComponent, {
      //scrollable: true,
      size: 'lg', //'sm' | 'lg' | 'xl' | string;
      backdropClass: 'service-backdrop',
      windowClass: 'service-window',
      centered: true
    }).result.then(result => {
      if (!result) { return }
    }).catch(error => { return error })
  }
  createFormUser():FormGroup {
    return this.formBuilder.group({
      fullName: [this.user.fullName],
      address: [this.user.address],
      email: [this.user.email],
      phoneNumber: [this.user.phoneNumber],
      gender: [true] // default value
    });
  }
}
