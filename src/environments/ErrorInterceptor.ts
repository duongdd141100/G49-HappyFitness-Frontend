import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toast: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Xử lý lỗi ở đây
        console.error('An error occurred:', error);
        this.toast.error(error.error.body);

        // Lấy URL của đường dẫn hiện tại
        const currentUrl = this.router.url;
        console.log(currentUrl);
     

        // Chuyển hướng đến trang login nếu có lỗi từ routing
        if (currentUrl.includes('/admin/') && error.status === 401) {
          this.toast.error('Vui lòng đăng nhập!');
          this.router.navigate(['/login']);
        }

        // Nếu muốn tiếp tục xử lý lỗi ở các interceptor khác hoặc components/services khác, có thể sử dụng throwError(error)
        // return throwError(error);

        // Nếu không muốn tiếp tục xử lý lỗi ở các interceptor khác hoặc components/services khác, return một Observable rỗng
        return new Observable<HttpEvent<any>>();
      })
    );
  }
}
