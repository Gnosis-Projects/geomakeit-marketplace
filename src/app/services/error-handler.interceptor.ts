import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let msg;
        switch (error.status) {
          case 500:
            msg = "Internal server error";
            break;
          case 401:
            msg = "Unauthorized access";
            break;
          case 404:
            msg = "Resource not found";
            break;
          default:
            msg = "Something went wrong";
        }
        this.toastrService.error(msg);
        return throwError(error);
      })
    );
  }
}
