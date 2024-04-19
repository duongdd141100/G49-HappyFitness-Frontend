import { Component, Input, OnInit, Renderer2 } from "@angular/core";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Location, PopStateEvent } from "@angular/common";
import { ROUTES2 } from "../sidebar/sidebar.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from 'src/app/services/services/auth.service';

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
  listTitles: any[];
  // @Input() public username: any;
  @Input() public id: any;

  constructor(
    public location: Location,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog, private renderer: Renderer2,
    // private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.takeOwnInfo()
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.takeOwnInfo()
      }
    });
    

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     const url = window.location.pathname;
    //   }
    // })
    
  }

  takeOwnInfo() {
    this.authService.getOwnInfo().subscribe({
      next: (res) => {
        //cho admin có thể xem chi tiết sản phẩm 
        // if (res.body.role && (res.body.role.id !== 1 && res.body.role.id !== 2)) {
        //   this.router.navigate([`/home`])
        //   return
        // }
        if(!res) {
          this.userName = null
          return  this.roleNumber = null
        } 
        this.roleNumber = res.body.role.id
        this.userName = res.body.username
      }, // nextHandler
      error: (err) => {
        this.roleNumber = null
        this.userName = null
        return
      }, // errorHandler
    })
  }

  refresh() {
  }

  handleLogout () {
    this.authService.signout();
    this.router.navigate(['/login']);
  }

}
