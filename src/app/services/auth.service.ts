import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Subject, tap, throwError} from "rxjs";
import {User} from "../shared/user.model";

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
  user = new Subject<User>()

  constructor(private http: HttpClient) {
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

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    )
    this.user.next(user)
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
