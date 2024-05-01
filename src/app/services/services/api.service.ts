import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  // private subject = new Subject<any>();
  
  private cartSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public cart$: Observable<any> = this.cartSubject.asObservable();
  private baseUrl = environment.apiUrl;

  // Authen
  private ME = this.baseUrl + "auth/me";
  private REGISTER = this.baseUrl + "/auth/signup";
  private EDITPROFILE = this.baseUrl + "/auth/edit-profile";
  private FORGETPASS = this.baseUrl + "/auth/forget-password/";

  // User
  private USER_INFOR = this.baseUrl + "users";
  private RESET_PASSWORD = this.baseUrl + "users/reset-password";
  private CREATE_USER = this.baseUrl + "users/create";
  private GET_PT_FREE = this.baseUrl + 'users/free-pt'
  
  // Cart
  private VIEWCART = this.baseUrl + "cart";
  private ADDCART = this.baseUrl + "cart/add";
  private DELETECART = this.baseUrl + "cart/delete";

  // Product
  private GET_PRODUCT = this.baseUrl + "products";
  private UPDATE_PRODUCT = this.baseUrl + "products/update/";
  private DEACTIVEPRODUCT = this.baseUrl + "products/delete/";
  private ACTIVE_PRODUCT = this.baseUrl + "products/active/";
  private CREATE_PRODUCT = this.baseUrl + "products/add";

  // Facilitiy
  private GET_ALL_FACILITY = this.baseUrl + "facilities";

  // Categories
  private GET_ALL_CATEGORY = this.baseUrl + "categories";

  // Suppliers
  private GET_ALL_SUPPLIER = this.baseUrl + "suppliers";

  // Facility Product
  private UPDATE_FACILITY_PRODUCT = this.baseUrl + "facility-product/update";

  // User Ticket
  private TICKET = this.baseUrl + "/api/user-ticket/extend";

  // Ticket
  private FACILITYTICKET = this.baseUrl + "tickets";
  private DETAILTICKET = this.baseUrl + "tickets";
  private CREATE_TICKET = this.baseUrl + "tickets/create";
  private DEACTIVATE_TICKET = this.baseUrl + "tickets/deactivate";
  private ACTIVE_TICKET = this.baseUrl + "tickets/active";
  private UPDATE_TICKET = this.baseUrl + "tickets/update";
  
  // Voucher
  private FIND_ALL_VOUCHER = this.baseUrl + "vouchers";
  private CREATE_VOUCHER = this.baseUrl + "vouchers/create";
  private UPDATE_VOUCHER = this.baseUrl + "vouchers/update";

  // Order
  private FIND_ALL_ORDER = this.baseUrl + "orders";
  
  private CREATE_ORDER = this.baseUrl + "orders/create";
  private CREATE_PAYMENT = this.baseUrl + "payment/create";
  private PAYMENT_COMPLETE = this.baseUrl + "payment/info";
  private PAYMENT_COMPLETE_TICKET = this.baseUrl + "payment/ticket-info";
  //Order ticket
  private CREATE_ORDER_TICKET = this.baseUrl + "user-ticket/buy";
  private TICKET_CUSTOMER = this.baseUrl + "user-ticket";
  private TICKET_CUSTOMER_EXTEND = this.baseUrl + "user-ticket/extend";
  private CHANGE_CUSTOMER_TICKET_USING = this.baseUrl + "user-ticket/using";

  // Schedule
  private FIND_SCHEDULE = this.baseUrl + "schedules";
  private ATTEND_SCHEDULE = this.baseUrl + "schedules/attend";

  // Classes
  private FIND_CLASS = this.baseUrl + "classes";

  //AI
  private AI_MENU = 'http://127.0.0.1:8000/submit'; // server AI khác

  //PAKAGE
  private GET_PAKAGE = this.baseUrl + "packages"
  private GET_TIME_TRAIN = this.baseUrl + "train-time"
  
  constructor(private http: HttpClient) { }

  private getHeadersWithToken(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', token ? 'Bearer ' + token : '');
  }
  getUsers(roleId = null, username = null): Observable<any> {
    const headers = this.getHeadersWithToken();
    let params = [];
    if (roleId) {
      params.push(`roleId=${roleId}`);
    }
    if (username != null) {
      params.push(`username=${username}`);
    }
    let paramsStr = params.length > 0 ? params.join('&') : '';
    return this.http.get<any>(`${this.USER_INFOR}` + (paramsStr ? `?${paramsStr}` : ''), { headers });
  }
  public createOrder(cartId, voucherCode?): Observable<any> {
    const headers = this.getHeadersWithToken();
    const url = !voucherCode ? this.CREATE_ORDER : `${this.CREATE_ORDER}?voucherCode=${voucherCode}`
    return this.http.post<any>(url, cartId , { headers });
  }
  public createTicketBuy(ticketId: number, voucherCode?): Observable<any> {
    const headers = this.getHeadersWithToken();
    const url = !voucherCode ? `${this.CREATE_ORDER_TICKET}/${ticketId}` : `${this.CREATE_ORDER_TICKET}/${ticketId}?voucherCode=${voucherCode}`
    return this.http.post<any>(url, null, { headers })
  }
  public createPayment(amount, orderId?, ticketId?, dataBody?):Observable<any>  {
    const headers = this.getHeadersWithToken();
    let url = orderId ?  `${this.CREATE_PAYMENT}?amount=${amount}&orderId=${orderId}` : `${this.CREATE_PAYMENT}?amount=${amount}&ticketId=${ticketId}`
    if(!orderId && !ticketId) url = this.CREATE_PAYMENT
    return this.http.post<any>(url , dataBody, { headers });
  }
  public completePayment(responseCode, orderId):Observable<any>  {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(this.GET_PAKAGE , { headers });
  }
  public getPtFree(data: {trainTimeId: number, facilityId: number, dayOfWeeks: Array<any>}):Observable<any>  {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(this.GET_PT_FREE , data, { headers });
  }
  public getTimeTrain():Observable<any>  {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(this.GET_TIME_TRAIN, { headers });
  }
  public completePayment(responseCode, orderId?, dataBody?):Observable<any>  {
    const headers = this.getHeadersWithToken();
    let url = `${this.PAYMENT_COMPLETE}?responseCode=${responseCode}&orderId=${orderId}`
    if (dataBody && !orderId) {
      url =  `${this.PAYMENT_COMPLETE}?responseCode=${responseCode}`
    }
    return this.http.post<any>(url ,dataBody , { headers });
  }


  public completePaymentTicket(responseCode, ticketId):Observable<any>  {
    const headers = this.getHeadersWithToken();
    const url = `${this.PAYMENT_COMPLETE_TICKET}?responseCode=${responseCode}&ticketId=${ticketId}`
    return this.http.post<any>(url , null , { headers });
  }
  public AImenu(dataUser: {
    male: number,
    age : number,
    height : number,
    weight :number,
    duration :number,
    heart_rate :number,
    body_temp :number
  }):Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(this.AI_MENU , dataUser,{ headers });
  }
  public deleteCart(cart): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.DELETECART}`, cart , { headers });
  }
  register(fullName: string, username: string, email: string, password: string, phoneNumber: string, role: any, gender: string, dob: string): Observable<any> {
    return this.http.post<any>(this.REGISTER, { fullName, username, email, password, phoneNumber, role, gender, dob });
  }

  public get(endpoint: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers });
  }
  public getTicketCustomerHistory(facilityId: string = null, isActive: string = null, isUsing: string = null): Observable<any> {
    const headers = this.getHeadersWithToken();
    let params = [];
    if (facilityId) {
      params.push(`facilityId=${facilityId}`);
    }
    if (isActive != null) {
      params.push(`isActive=${isActive}`);
    }
    if (isUsing != null) {
      params.push(`isUsing=${isUsing}`)
    }
    let paramsStr = params.length > 0 ? params.join('&') : '';
    return this.http.get(`${this.TICKET_CUSTOMER}` + (paramsStr ? `?${paramsStr}` : ''), { headers });
  }
  public getProductCustomerHistory(): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get(`${this.TICKET_CUSTOMER}`, { headers });
  }
  public onExtendTicket(ticketId,voucherCode?): Observable<any> {
    const headers = this.getHeadersWithToken();
    let url = voucherCode ? `${this.TICKET_CUSTOMER_EXTEND}/${ticketId}?voucherCode=${voucherCode}` : `${this.TICKET_CUSTOMER_EXTEND}/${ticketId}`
    return this.http.post(url ,null , { headers });
  }
  public editprofile(id: string, path: string, fullName: string, gender: string, dob: string, address: any, phoneNumber: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(this.EDITPROFILE, { id, path, fullName, gender, dob, address, phoneNumber }, { headers });
  }


  public me(): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(this.ME, { headers });
  }

  public forgetpass(mail: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.FORGETPASS}/${mail}`, { headers });
  }

  public addCart(dataCart: {quantity: number, facilityProduct: {id: number}}): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.ADDCART}`, dataCart , { headers });
  }

  public ticket(mail: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.ADDCART}`, { headers });
  }


  public addTicket(mail: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.ADDCART}`, { headers });
  }

  public findAllTicket(mail: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.ADDCART}`, { headers });
  }

  public findTicketDetail(id: any): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${this.DETAILTICKET}/${id}`, { headers });
  }

  public ticketHistory(mail: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.ADDCART}`, { headers });
  }

  public getRevune(mail: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.ADDCART}`, { headers });
  }


  public getDashboard(mail: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.ADDCART}`, { headers });
  }


  public createOrd(mail: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.ADDCART}`, { headers });
  }

  public ordDetail(mail: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.ADDCART}`, { headers });
  }

  public getProduct(facilityId = 1): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${this.GET_PRODUCT}?facilityId=${facilityId}`, { headers });
  }
  public getSticketAdmin(facilityId = null): Observable<any> {
    const headers = this.getHeadersWithToken();
    let url = facilityId ? `${this.FACILITYTICKET}?facilityId=${facilityId}` : this.FACILITYTICKET
    return this.http.get<any>(url, { headers });
  }
  public getAllFacility(): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${this.GET_ALL_FACILITY}`, { headers });
  }

  public getAllCategory(): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${this.GET_ALL_CATEGORY}`, { headers });
  }

  public getAllSupplier(): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${this.GET_ALL_SUPPLIER}`, { headers });
  }

  public updateProduct(nextProduct, id): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.UPDATE_PRODUCT}${id}`, nextProduct, { headers });
  }

  public updateFacilityProduct(nextFacilityProduct, productId, facility): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.UPDATE_FACILITY_PRODUCT}?productId=${productId}&facilityId=${facility}`, nextFacilityProduct, { headers });
  }
  public createTicketAdmin(ticketNew): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.CREATE_TICKET}`, ticketNew, { headers });
  }
  public getProductByCode(code: string, facilityId): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${this.GET_PRODUCT}/${code}?facilityId=${facilityId}`, { headers });
  }

  public addProduct(mail: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.ADDCART}`, { headers });
  }

  public deactiveProduct(id: number): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.DEACTIVEPRODUCT}${id}`,{} , { headers });
  }

  public activeProduct(id: number): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.ACTIVE_PRODUCT}${id}`, {}, { headers });
  }

  public findAllVoucher(id: any = null): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${this.FIND_ALL_VOUCHER}` + (id ? `/${id}` : ''), {headers});
  }

  public viewCart() {
    const headers = this.getHeadersWithToken();
    this.http.get<any>(`${this.VIEWCART}`, { headers }).subscribe(
      (res) => {
        this.cartSubject.next(res);
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  public post(endpoint: string, body: any): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post(`${this.baseUrl}/${endpoint}`, body, { headers });
  }


  public put(endpoint: string, body: any): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.put(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  public delete(endpoint: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.delete(`${this.baseUrl}/${endpoint}`, { headers });
  }

  public deleteUser(endpoint: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.delete(`${this.baseUrl}/${endpoint}`, { headers });
  }
  public findOrders(facilityId: number, isPaid: boolean, isDelivered: boolean): Observable<any> {
    const headers = this.getHeadersWithToken();
    let params = [];
    if (facilityId) {
      params.push(`facilityId=${facilityId}`);
    }
    if (isPaid != null) {
      params.push(`isPaid=${isPaid}`);
    }
    if (isDelivered != null) {
      params.push(`isDelivered=${isDelivered}`)
    }
    let paramsStr = params.length > 0 ? params.join('&') : '';
    return this.http.get(`${this.FIND_ALL_ORDER}` + (paramsStr ? `?${paramsStr}` : ''), { headers });
  }
  public findProductHistory(): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get(`${this.FIND_ALL_ORDER}`, { headers });
  }
  public findProductHistoryDetail(orderId): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get(`${this.FIND_ALL_ORDER}/${orderId}`, { headers });
  }
  public resetPassword(username: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.RESET_PASSWORD}/${username}`, null,{ headers });
  }
  public createProduct(product: any): Observable<any> {
    let headers = this.getHeadersWithToken();
    // headers = headers.set('enctype', 'multipart/form-data');
    const formData = new FormData();
    formData.append('product', product)
    return this.http.post<any>(`${this.CREATE_PRODUCT}`, formData,{ headers });
  }

  public getProductDetail(facilityId = 1, code: any): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${this.GET_PRODUCT}/${code}?facilityId=${facilityId}`, { headers });
  }

  public createUser(user): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.CREATE_USER}`, user, { headers });
  }
  public deactivateTicket(id): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.DEACTIVATE_TICKET}/${id}`, null, { headers });
  }
  public activeTicket(id): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.ACTIVE_TICKET}/${id}`, null, { headers });
  }
  public updateTicket(id, ticket): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.UPDATE_TICKET}/${id}`, ticket, { headers });
  }
  public createVoucher(voucher): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.CREATE_VOUCHER}`, voucher, { headers });
  }
  public updateVoucher(voucher, id = null): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.UPDATE_VOUCHER}/${id}`, voucher, { headers });
  }
  public changeCustomerTicketUsing(username: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.CHANGE_CUSTOMER_TICKET_USING}/${username}`, null, { headers });
  }

  public getClasses(): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${this.FIND_CLASS}`, { headers });
  }

  public getSchedules(classId: any = null): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${this.FIND_SCHEDULE}` + (classId ? `?classId=${classId}` : ''), { headers });
  }

  public attend(scheduleId): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.ATTEND_SCHEDULE}/${scheduleId}`, null, { headers });
  }
}
