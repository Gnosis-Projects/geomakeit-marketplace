import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import {SelectorService} from "./selector.service";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
          const errorMessage =  new Error();
          errorMessage.message = 'Unknown Error!'

          if (error.status === 401) { // if user is not authenticated, redirect to login form
            errorMessage.message = 'Unauthorized user!'
          }
          if (error.status >= 500) { // if caught a server error
            errorMessage.message = 'There is a server error. Try again  later'
          }
          if (error.status === 404) { // if result not founded
            errorMessage.message = 'There are no results!'
          }
          if (error.status === 400) { // error response
            errorMessage.message = 'There is an error. Check your request!'
          }

          this.toastrService.error(errorMessage.message);
          return throwError(errorMessage.message);
      })
    );
  }
}
