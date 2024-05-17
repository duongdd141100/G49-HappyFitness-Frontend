import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoBuyPakageComponent } from './info-buy-pakage/info-buy-pakage.component';
import { AuthService } from '../services/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-pakage',
  templateUrl: './training-pakage.component.html',
  styleUrls: ['./training-pakage.component.scss']
})
export class TrainingPakageComponent implements OnInit {
  pakages:any = [];
  type: any = {
    one: 'ONE_ON_ONE',
    many: 'ONE_ON_MANY'
  }
  constructor(private apiService: ApiService, private toast: ToastrService, private router: Router, private _modal: NgbModal, private authService: AuthService) { }

  ngOnInit(): void {
    this.apiService.getPackage().subscribe({
      next: (res) => {
        this.pakages = res.body;
      }, // nextHandler
      error: (err) => {
        
        return
      }, // errorHandler
    })

  }
  handleBuyPakage(pakage) {
    // if (pakage.type == this.type.many) return this.toast.error('Gói này chưa hoạt động!');
    this.authService.getOwnInfo().subscribe({
      next: (res) => {
        const modalRef = this._modal.open(InfoBuyPakageComponent, {
          //scrollable: true,
          size: 'md', //'sm' | 'lg' | 'xl' | string;
          backdropClass: 'service-backdrop',
          windowClass: 'service-window',
          centered: true
        })
        modalRef.componentInstance.package = pakage
        modalRef.result.then(result => {
          if (!result) { return }
        }).catch(error => { return error })
      },
      error: (err) => {
        if(err.status  === 401) {
          this.toast.error('Vui lòng đăng nhập!');
          this.router.navigate(['/login']);
        }
      }
    });       

   
  } 
}
