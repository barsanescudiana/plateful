import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Tokens.AccessToken');
    if (token) {
      const newReq = httpRequest.clone( {setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }} );
      return next.handle(newReq);
    }
    return next.handle(httpRequest);
  }
}
