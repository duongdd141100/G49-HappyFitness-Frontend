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
  private DETAILTICKET = this.baseUrl + "tickets/5";
  private CREATE_TICKET = this.baseUrl + "tickets/create";
  private DEACTIVATE_TICKET = this.baseUrl + "tickets/deactivate";
  private ACTIVE_TICKET = this.baseUrl + "tickets/active";
  
  // Voucher
  private FIND_ALL_VOUCHER = this.baseUrl + "vouchers";

  // Order
  private FIND_ALL_ORDER = this.baseUrl + "orders";

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

  public findTicketDetail(mail: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.DETAILTICKET}`, { headers });
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

  public findAllVoucher(): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${this.FIND_ALL_VOUCHER}`, {headers});
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
}
