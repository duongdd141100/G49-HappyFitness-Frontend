import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app.routing";

import { HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsModule } from "@angular/google-maps";
import { AppComponent } from "./app.component";
import { IntroductionComponent } from "./introduction/home/introduction.component";
import { LoginComponent } from "./auth/login/login.component";
import { ForgotPWComponent } from "./auth/forgot-password/forgot-pw.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { ChangePassComponent } from "./auth/change-password/change-password.component";
import { SupportHelpComponent } from "./auth/support-help/support.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { NavbarCustomerComponent } from "./shared/navbar-customer/navbar-customer.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { CommonModule, registerLocaleData } from '@angular/common';
import { AboutComponent } from "./introduction/about/about.component";
import { ContactComponent } from "./introduction/contact/contact.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UpdateProductComponent } from "./product/update/update-product.component";
import { CreateProductComponent } from "./product/create/create-product.component";
import { ListProductComponent } from "./product/list/list-product.component";
import { ListCustomerProductComponent } from "./product/list-customer/list";
import { ProductDetailComponent } from "./product/detail/product-detail.component";
import { EditAccountComponent } from "./account/edit/edit-account.component";
import { CreateAccountComponent } from "./account/create/create-account.component";
import { ListAccountComponent } from "./account/list/list-account.component";
import { OrderCheckoutComponent } from "./order/checkout/order-checkout.component";
import { OrderDetailComponent } from "./order/detail/order-detail.component";
import { OrderHomeComponent } from "./order/home/order-home.component";
import { AuthService } from "./services/services/auth.service";
import { ApiService } from "./services/services/api.service";
import { TicketListComponent } from "./ticket/ticket-list/ticket-list.component";
import { TicketDetailComponent } from "./ticket/ticket-detail/ticket-detail.component";
import { MatSliderModule } from '@angular/material/slider';
import { EditTicketComponent } from "./ticket/edit-ticket/edit-ticket.component";
import { CreateTicketComponent } from "./ticket/create-ticket/create-ticket.component";
import { ListTicketAdComponent } from "./ticket/list-admin/list-ticket-admin.component";
import localeVi from '@angular/common/locales/vi';
import { InputDirectivesModule } from "./directives/directives.module";
import { ErrorInterceptor } from "src/environments/ErrorInterceptor";
import { OrderAdminViewComponent } from "./order/admin-view/order-admin-view.component";
import { FacilityViewAdminComponent } from "./facility/facility-view/facility-view.component";
import { VoucherViewAdminComponent } from "./voucher/voucher-view-admin/voucher-view-admin.component";
import { CartComponent } from "./cart/cart.component";
import { CreateVoucherComponent } from "./voucher/create-voucher/create-voucher.component";
import { UpdateVoucherComponent } from "./voucher/update-voucher/update-voucher.component";
import { OrderSuccessComponent } from "./order/order-success/order-success.component";
import { ProfileComponent } from './account/profile/profile.component';
import { AIMenuModalComponent } from './account/profile/ai-menu-modal/ai-menu-modal.component';
import { OrderCheckoutTicketComponent } from "./order/checkout-ticket/checkout-ticket.component";
import { OrderTicketSuccessComponent } from "./order/order-ticket-success/order-ticket-success.component";
import { TicketCustomerOrderComponent } from './ticket/ticket-customer-order/ticket-customer-order.component';
import { ProductCustomerOrderComponent } from './ticket/product-customer-order/product-customer-order.component';
import { ViewOrderDetailComponent } from './ticket/product-customer-order/view-order-detail/view-order-detail.component';
import { CustomerTicketAdComponent } from "./ticket/customer-ticket-admin/list-ticket-admin.component";
import { TrainingPakageComponent } from './training-pakage/training-pakage.component';
import { InfoBuyPakageComponent } from './training-pakage/info-buy-pakage/info-buy-pakage.component';
import { ViewClassAdComponent } from "./classes/view-admin/view-class-admin.component";
import { ScheduleComponent } from "./classes/schedules/schedule.component";
import { StudentComponent } from "./classes/students/students.component";
import { AttendanceComponent } from "./classes/attendance/attendance.component";

// import { FormsModule } from '@angular/forms';
registerLocaleData(localeVi, 'vi-VN');
@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    LoginComponent,
    ForgotPWComponent,
    SignupComponent,
    ChangePassComponent,
    SupportHelpComponent,
    NavbarComponent,
    NavbarCustomerComponent,
    SidebarComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    DashboardComponent,
    ListProductComponent,
    ListCustomerProductComponent,
    ProductDetailComponent,
    CreateProductComponent,
    UpdateProductComponent,
    EditAccountComponent,
    ListAccountComponent,
    CreateAccountComponent,
    OrderCheckoutComponent,
    OrderDetailComponent,
    OrderHomeComponent,
    OrderAdminViewComponent,
    TicketListComponent,
    ListTicketAdComponent,
    TicketDetailComponent,
    CreateTicketComponent,
    EditTicketComponent,
    FacilityViewAdminComponent,
    VoucherViewAdminComponent,
    OrderAdminViewComponent,
    CartComponent,
    CreateVoucherComponent,
    UpdateVoucherComponent,
    OrderSuccessComponent,
    ProfileComponent,
    AIMenuModalComponent,
    OrderCheckoutTicketComponent,
    OrderTicketSuccessComponent,
    TicketCustomerOrderComponent,
    ProductCustomerOrderComponent,
    ViewOrderDetailComponent,
    CustomerTicketAdComponent,
    TrainingPakageComponent,
    InfoBuyPakageComponent,
    ViewClassAdComponent,
    ScheduleComponent,
    StudentComponent,
    AttendanceComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    IvyCarouselModule,
    MatDialogModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    CommonModule,
    InputDirectivesModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 30000, // 15 seconds
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
    }),
    GoogleMapsModule,
    HttpClientJsonpModule,
    MatSliderModule
  ],
  providers: [
    AuthService, 
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
  exports: [],
})
export class AppModule { }
