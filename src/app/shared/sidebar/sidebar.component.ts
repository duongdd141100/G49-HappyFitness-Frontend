import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/services/auth.service';

declare interface RouteInfoManager {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES2: RouteInfoManager[] = [
  { path: '/admin/dashboard', title: 'Thống kê', icon: 'fa-solid fa-chart-line', class: '' },
  { path: '/admin/accounts', title: 'Tài khoản', icon: 'fa-solid fa-user', class: '' },
  { path: '/admin/orders', title: 'Đơn đặt', icon: 'fa-solid fa-cart-shopping', class: '' },
  { path: '/admin/products', title: 'Sản phẩm', icon: 'fa-solid fa-dumbbell', class: '' },
  { path: '/admin/facilities', title: 'Cơ sở', icon: 'fa-solid fa-house', class: '' },
  { path: '/admin/tickets', title: 'Vé', icon: 'fa-solid fa-ticket', class: '' },
  { path: '/admin/customer-ticket', title: 'Vé khách hàng', icon: 'fa-solid fa-ticket', class: '' },
  { path: '/admin/vouchers', title: 'Mã giảm giá', icon: 'fa-solid fa-ticket-simple', class: '' },
  { path: '/admin/classes', title: 'Lớp', icon: 'fa-solid fa-school', class: '' },
  { path: '/admin/schedule', title: 'Lịch tập', icon: 'ni-tv-2', class: '' },
];

export const ROUTES_PT: RouteInfoManager[] = [
  { path: '/admin/dashboard', title: 'Thống kê', icon: 'fa-solid fa-chart-line', class: '' },
  { path: '/admin/products', title: 'Sản phẩm', icon: 'fa-solid fa-dumbbell', class: '' },
  { path: '/admin/facilities', title: 'Cơ sở', icon: 'fa-solid fa-house', class: '' },
  { path: '/admin/tickets', title: 'Vé', icon: 'fa-solid fa-ticket', class: '' },
  { path: '/admin/vouchers', title: 'Mã giảm giá', icon: 'fa-solid fa-ticket-simple', class: '' },
  { path: '/admin/classes', title: 'Lớp', icon: 'fa-solid fa-school', class: '' },
  { path: '/admin/schedule', title: 'Lịch tập', icon: 'ni-tv-2', class: '' },
];



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public menuItemsCleaner: any[];
  public menuItemsManager: any[];
  public menuItemsAdmin: any[];
  public menuItemsLead: any[];
  public isCollapsed = true;
  public me: any;
  @Input() public adminNavbar: any;
  @Input() public cleanerNavbar: any;
  @Input() public leadNavbar: any;
  @Input() public managerNavbar: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    ) {
    this.menuItemsManager = this.setActiveClassManager(ROUTES2);
  }

  ngOnInit() {
    this.onLoadMe();
    // if (this.cacheService.getHasClearedCache()) {
    //   this.refresh();

    //   this.cacheService.setHasClearedCache(false);
    // }

    this.route.url.subscribe(segments => {
      const currentUrl = window.location.href;
      const baseUrl = "http://localhost:83/hpf";
      let remainingPath = '';
      if (currentUrl.startsWith(baseUrl)) {
        // Lấy phần sau baseUrl bằng cách sử dụng substr
        remainingPath = currentUrl.substr(baseUrl.length);
        if (remainingPath.includes('product')) {
          remainingPath = '/product';
        } else if (remainingPath.includes('account')) {
          remainingPath = '/account';
        } else if (remainingPath.includes('order')) {
          remainingPath = '/order';
        }

        console.log("Phần sau cụm baseUrl:", remainingPath);
      } else {
        console.log("Chuỗi URL không chứa cụm baseUrl.");
      }
      // if (segments.length > 0) {
      //   const currentUrl = segments.map(segment => segment.path).join('/');
      //   console.log("currentUrl", currentUrl);
      //   console.log("segment", segments);
      // } else {
      //   console.log("No segments found in URL");
      // }
      // console.log("currentUrl", currentUrl);

      if (this.managerNavbar) {
        this.menuItemsManager = this.setActiveClassManager(ROUTES2, remainingPath);
        console.log("this.menuItemsManager", this.menuItemsManager);

        this.menuItemsManager = ROUTES2.filter(menuItem => menuItem);
      }
    });


    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });

  }
  onLoadMe() {
    this.authService.getOwnInfo().subscribe({
      next: (res) => {
        this.me = res.body
        if (this.me.role.id === 5) {
          this.menuItemsManager = this.setActiveClassManager(ROUTES_PT);
        }
      }, // nextHandler
      error: (err) => {
      
        return
      }, // errorHandler
    })
  }

  private setActiveClassManager(routes: RouteInfoManager[], currentUrl: string = ''): RouteInfoManager[] {
    return routes.map(route => {
      route.class = (route.path === currentUrl) ? 'selected-sidebar' : '';
      if (route.path === currentUrl) {
        console.log("routes", route);
      }

      return route;
    });
  }

  logout() {
    // this.authService.signout().subscribe({
    //   next: () => {
    //     this.router.navigate(["/login"]);
    //   },
    // });
  }

  refresh() {
    this.managerNavbar = false;
  }
}
