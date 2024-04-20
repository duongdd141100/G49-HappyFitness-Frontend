import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./auth/signup/signup.component";
import { IntroductionComponent } from "./introduction/home/introduction.component";
import { LoginComponent } from "./auth/login/login.component";
import { ForgotPWComponent } from "./auth/forgot-password/forgot-pw.component";
import { ChangePassComponent } from "./auth/change-password/change-password.component";
import { SupportHelpComponent } from "./auth/support-help/support.component";
import { AboutComponent } from "./introduction/about/about.component";
import { ContactComponent } from "./introduction/contact/contact.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ListProductComponent } from "./product/list/list-product.component";
import { CreateProductComponent } from "./product/create/create-product.component";
import { UpdateProductComponent } from "./product/update/update-product.component";
import { CreateAccountComponent } from "./account/create/create-account.component";
import { EditAccountComponent } from "./account/edit/edit-account.component";
import { ListAccountComponent } from "./account/list/list-account.component";
import { OrderCheckoutComponent } from "./order/checkout/order-checkout.component";
import { OrderDetailComponent } from "./order/detail/order-detail.component";
import { OrderHomeComponent } from "./order/home/order-home.component";
import { OrderHistoryComponent } from "./order/history/order-history.component";
import { TicketListComponent } from "./ticket/ticket-list/ticket-list.component";
import { TicketDetailComponent } from "./ticket/ticket-detail/ticket-detail.component";
import { ListTicketAdComponent } from "./ticket/list-admin/list-ticket-admin.component";
import { CreateTicketComponent } from "./ticket/create-ticket/create-ticket.component";
import { EditTicketComponent } from "./ticket/edit-ticket/edit-ticket.component";
import { ListCustomerProductComponent } from "./product/list-customer/list"
import { ProductDetailComponent } from "./product/detail/product-detail.component"
import { FacilityViewAdminComponent } from "./facility/facility-view/facility-view.component"
import { VoucherViewAdminComponent } from "./voucher/voucher-view-admin/voucher-view-admin.component"
import { OrderAdminViewComponent } from "./order/admin-view/order-admin-view.component"
import { CartComponent } from "./cart/cart.component";
import { CreateVoucherComponent } from "./voucher/create-voucher/create-voucher.component";
import { UpdateVoucherComponent } from "./voucher/update-voucher/update-voucher.component";
import { OrderSuccessComponent } from "./order/order-success/order-success.component";
import { ProfileComponent } from "./account/profile/profile.component";
import { OrderCheckoutTicketComponent } from "./order/checkout-ticket/checkout-ticket.component";
import { OrderTicketSuccessComponent } from "./order/order-ticket-success/order-ticket-success.component";


const routes: Routes = [
  //admin
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/products', component: ListProductComponent },
  { path: 'admin/create-product', component: CreateProductComponent },
  { path: 'admin/update-product/:code', component: UpdateProductComponent },
  { path: 'admin/create-account', component: CreateAccountComponent },
  { path: 'admin/update-account/:username', component: EditAccountComponent },
  { path: 'admin/accounts', component: ListAccountComponent },
  { path: 'admin/create-ticket', component: CreateTicketComponent },
  { path: 'admin/update-ticket/:id', component: EditTicketComponent },
  { path: 'admin/tickets', component: ListTicketAdComponent },
  { path: 'admin/facilities', component: FacilityViewAdminComponent },
  { path: 'admin/vouchers', component: VoucherViewAdminComponent },
  { path: 'admin/orders', component: OrderAdminViewComponent },
  { path: 'admin/create-voucher', component: CreateVoucherComponent },
  { path: 'admin/update-voucher/:id', component: UpdateVoucherComponent },





  //customer
  { path: 'register', component: SignupComponent },
  { path: 'home', component: IntroductionComponent },
  { path: 'product-detail/:code', component: ProductDetailComponent},
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPWComponent },
  { path: 'change-password', component: ChangePassComponent },
  { path: 'support-help', component: SupportHelpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: ListCustomerProductComponent },
  { path: 'order-checkout', component: OrderCheckoutComponent },
  { path: 'order-checkout-ticket', component: OrderCheckoutTicketComponent },
  { path: 'order-detail', component: OrderDetailComponent },
  { path: 'order-home', component: OrderHomeComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'tickets', component: TicketListComponent },
  { path: 'ticket-detail', component: TicketDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order-success/:id', component: OrderSuccessComponent },
  { path: 'order-ticket-succes/:id', component: OrderTicketSuccessComponent },
  // { path: 'ticket-customer-order', component: OrderTicketSuccessComponent },
  // { path: 'product-customer-order', component: OrderTicketSuccessComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
