import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = null;
    this.authService.user.subscribe(user => {
      if (user) {
        token = user.token
      } else {
        token = localStorage.getItem('token')
      }
    })

    if (!token) {
      return next.handle(req)
    }

    const modifiedReq = req.clone({params: new HttpParams().set('auth', token)})

    return next.handle(modifiedReq)
  }
}
