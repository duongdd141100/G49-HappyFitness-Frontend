import {
  Component,
  OnInit,
  Inject,
  Renderer2,
  ElementRef,
  ViewChild,
  HostListener,
} from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { Location } from "@angular/common";
import { filter, Observable, Subscription } from "rxjs";
import { ROUTES2 } from "./shared/sidebar/sidebar.component";
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  private _router: Subscription;
  customerNavbar = true;
  managerNavbar = false;
  isAuthenticated = false;
  isAuthenticated$: Observable<boolean>;
  username: any;
  id: any;
  listTitles: any[];
  constructor(
    private renderer: Renderer2,
    private router: Router,
    @Inject(DOCUMENT) private document: any,
    private element: ElementRef,
    public location: Location,
    private route: ActivatedRoute
  ) { 

  }
  @HostListener("window:scroll", ["$event"])
  hasScrolled() {
    var st = window.pageYOffset;
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    var navbar = document.getElementsByTagName("nav")[0];

    // If they scrolled down and are past the navbar, add class .headroom--unpinned.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      if (navbar?.classList.contains("headroom--pinned")) {
        navbar?.classList.remove("headroom--pinned");
        navbar?.classList.add("headroom--unpinned");
      }
      // $('.navbar.headroom--pinned').removeClass('headroom--pinned').addClass('headroom--unpinned');
    } else {
      // Scroll Up
      //  $(window).height()
      if (st + window.innerHeight < document.body.scrollHeight) {
        // $('.navbar.headroom--unpinned').removeClass('headroom--unpinned').addClass('headroom--pinned');
        if (navbar?.classList.contains("headroom--unpinned")) {
          navbar.classList.remove("headroom--unpinned");
          navbar.classList.add("headroom--pinned");
        }
      }
    }

    lastScrollTop = st;
  }
  getTitle() {
    var titlee = this.location.path();
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "";
  }
  checkUrlChange() {
    const currentUrl = this.router.url;
    // Kiểm tra xem URL có chứa '/admin/' không
    this.managerNavbar = currentUrl.includes('/admin/');
  }
  
  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.checkUrlChange(); // Hàm xử lý thay đổi url
        if (this.managerNavbar) {
          this.listTitles = ROUTES2.filter((listTitle) => listTitle);
        }
      }
    });
    var navbar: HTMLElement =
      this.element?.nativeElement?.children[0].children[0];
    this._router = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (window.outerWidth > 991) {
          window.document.children[0].scrollTop = 0;
        } else {
          window.document.activeElement.scrollTop = 0;
        }
        this.renderer.listen("window", "scroll", (event) => {
          const number = window.scrollY;
          if (number > 150 || window.pageYOffset > 150) {
            // add logic
            navbar.classList.add("headroom--not-top");
          } else {
            // remove logic
            navbar.classList.remove("headroom--not-top");
          }
        });
      });
    this.hasScrolled();
  }
}
