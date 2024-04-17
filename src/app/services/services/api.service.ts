import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  // private subject = new Subject<any>();

  private baseUrl = environment.apiUrl;
  // private GENERATE_HEAD_PHONE = this.baseUrl + "api/v1/common";
  // private GENERATE_NOTI = this.baseUrl + "api/v1/common/loan-notification";
  // private UPLOAD_FILE = this.baseUrl + "api/v1/files/upload-file";
  // // private IMPORT_PROFILE = this.baseUrl + "api/v1/files/import-file";
  // private SEND_OTP = this.baseUrl + "api/v1/otp/send-otp";
  // private VERIFY_OTP = this.baseUrl + "api/v1/otp/verify-otp";
  private USER_INFOR = this.baseUrl + "users";
  private REGISTER = this.baseUrl + "/auth/signup";
  private EDITPROFILE = this.baseUrl + "/auth/edit-profile";
  private ME = this.baseUrl + "/auth/me";
  private FORGETPASS = this.baseUrl + "/auth/forget-password/";
  private VIEWCART = this.baseUrl + "/cart";
  private ADDCART = this.baseUrl + "cart/add";
  private GET_PRODUCT = this.baseUrl + "products";
  private GET_ALL_FACILITY = this.baseUrl + "facilities";
  private GET_ALL_CATEGORY = this.baseUrl + "categories";
  private GET_ALL_SUPPLIER = this.baseUrl + "suppliers";
  private UPDATE_PRODUCT = this.baseUrl + "products/update/";
  private UPDATE_FACILITY_PRODUCT = this.baseUrl + "facility-product/update";
  private TICKET = this.baseUrl + "/api/user-ticket/extend";
  // 1?voucherCode = VOUCHER_1
  private FACILITYTICKET = this.baseUrl + "tickets";
  private DETAILTICKET = this.baseUrl + "api/tickets/5";
  private CREATE_TICKET = this.baseUrl + "tickets/create";
  private DEACTIVEPRODUCT = this.baseUrl + "products/delete/";
  private ACTIVE_PRODUCT = this.baseUrl + "products/active/";
  private FIND_ALL_VOUCHER = this.baseUrl + "vouchers";
  // // THIẾU 1 số api liên quan đến quyền / phân quyền và admin do chưa design
  // private CREATE_LOAN = this.baseUrl + "user/create-loan";
  // private CHECK_LOAN = this.baseUrl + "user/is-exist-loan";
  // private UPDATE_INFOR = this.baseUrl + "user/update-base-information";
  // private CHECK_PHOTO = this.baseUrl + "user/update-kyc-image";
  // Orders
  private FIND_ALL_ORDER = this.baseUrl + "orders";

  constructor(private http: HttpClient) { }

  private getHeadersWithToken(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', token ? 'Bearer ' + token : '');
  }
  getUsers(roleId = null): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(roleId ? `${this.USER_INFOR}?roleId=${roleId}` : this.USER_INFOR, { headers });
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
    return this.http.post<any>(this.ME, { headers });
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

  public viewCart(mail: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.post<any>(`${this.VIEWCART}`, { headers });
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

}
