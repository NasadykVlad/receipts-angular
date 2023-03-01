import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "../models/user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean

}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null)
  private tokenExpirationTimer;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  signup(email, password) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-wx7TsjQy_M_npuBXnoYVXSkDtqy5m7Q', {
      email,
      password,
      returnSecureToken: true
    })
      .pipe(catchError(errorRes => {
          return this.handleError(errorRes)
        }),
        tap(res => {
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          )
        })
      )
  }

  login(email, password) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-wx7TsjQy_M_npuBXnoYVXSkDtqy5m7Q', {
      email,
      password,
      returnSecureToken: true
    })
      .pipe(catchError(errorRes => {
          return this.handleError(errorRes)
        }),
        tap(res => {
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          )
        }))
  }

  logout() {
    localStorage.removeItem('user')
    this.user.next(null)
    this.router.navigate(['/auth']).then()
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      return
    }

    const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate))

    if (loadedUser.token) {
      const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
      this.user.next(loadedUser)
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    )
    localStorage.setItem('user', JSON.stringify(user))
    this.user.next(user)
    this.autoLogout(expiresIn * 1000)
  }

  private handleError({error}) {
    let errorMessage = 'Unknown error'
    if (!error || !error.error) {
      return throwError(errorMessage)
    }
    switch (error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is already exists'
        break
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Not found email'
        break
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password'
        break
      case 'USER_DISABLED':
        errorMessage = 'User disabled'
        break
      default:
        errorMessage = 'Unknown error'
    }
    return throwError(errorMessage)
  }
}
