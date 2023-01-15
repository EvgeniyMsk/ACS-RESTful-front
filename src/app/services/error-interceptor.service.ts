import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, delay} from 'rxjs/operators';
import {TokenStorageService} from "./token-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService,
              private _snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((errorResponse: HttpErrorResponse) => {
      if (errorResponse.status === 401) {
        this.openSnackBar('Неверный логин/пароль!')
        setTimeout(() => {
          this.tokenStorageService.logout();
          window.location.reload();
        }, 2000)
      }
      if (errorResponse.status === 0) {
        this.openSnackBar('Нет соединения с сервером!')
        setTimeout(() => {
          this.tokenStorageService.logout();
          window.location.reload();
        }, 1000)
      }
      const error = errorResponse.error.message || errorResponse.statusText;
      return throwError(error);
    }));
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, 'Ок', {
      duration: 2000,
    });
  }
}



export const authErrorInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}
];
