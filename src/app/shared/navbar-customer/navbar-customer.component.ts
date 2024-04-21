import { Component, Input, OnInit, Renderer2 } from "@angular/core";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Location, PopStateEvent } from "@angular/common";
import { ROUTES2 } from "../sidebar/sidebar.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from 'src/app/services/services/auth.service';
import { ApiService } from "src/app/services/services/api.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-navbar-customer",
  templateUrl: "./navbar-customer.component.html",
  styleUrls: ["./navbar-customer.component.scss"],
})
export class NavbarCustomerComponent implements OnInit {
  public isCollapsed = true;
  public focus;
  public roleNumber: any;
  public userName: any;
  quantityCart: number;
  listTitles: any[];
  // @Input() public username: any;
  @Input() public id: any;

  constructor(
    public location: Location,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    public dialog: MatDialog, private renderer: Renderer2,
    private toast: ToastrService
    // private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.takeOwnInfo();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.takeOwnInfo();
        
      }
    }); 
  }

  takeOwnInfo() {
    this.authService.getOwnInfo().subscribe({
      next: (res) => {
        //cho admin có thể xem chi tiết sản phẩm 
        // if (res.body.role && (res.body.role.id !== 1 && res.body.role.id !== 2)) {
        //   this.router.navigate([`/home`])
        //   return
        // }
        console.info(res.body)
        if(!res) {
          this.userName = null
          return  this.roleNumber = null
        } 
        this.roleNumber = res.body.role.id
        this.userName = res.body.username
        this.onLoadCart()

      }, // nextHandler
      error: (err) => {
        this.roleNumber = null
        this.userName = null
        return
      }, // errorHandler
    })
  }
  onLoadCart() {
    if(this.roleNumber === 3) {
      this.apiService.viewCart();
      this.apiService.cart$.subscribe(
        (data) => {
          if (!data) return;
          this.quantityCart = data.body.length;
          // Cập nhật giao diện với dữ liệu giỏ hàng mới
        },
        (error) => {
          console.error('Error fetching cart:', error);
        })
    }
  }
  refresh() {
  }
  handleViewCart() { 
    if (this.quantityCart <= 0) return this.toast.error('Giỏ hàng chưa có sản phẩm!');
    if(this.roleNumber !== 3) return;
    this.router.navigate(['/cart']);
  }
  handleLogout () {
    this.authService.signout();
    this.router.navigate(['/login']);
    sessionStorage.removeItem('productBuys');
    sessionStorage.removeItem('ticketBuys');
  }

}
