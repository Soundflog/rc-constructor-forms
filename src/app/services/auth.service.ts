import {Inject, Injectable, signal} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {TuiAlertService} from "@taiga-ui/core";
import {catchError, Observable, of, tap} from "rxjs";
import {IAuthUser, IUserJwtResponse} from "../models/interface/user.interface";
import {API_URL} from "../const/constants";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // real-project = false
  isAuthSig = signal<boolean>(true)

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
  ) {
    const token = localStorage.getItem('token')
    this.isAuthSig.set(!!token)
  }

  // signUp
  signUp(userData: IAuthUser) {
    return this.http.post<any>(`${API_URL}/signup`, userData)
      .pipe(
        tap(() =>
          this.login(userData)
        ),
        catchError((error) => {
          this.handeError(error);
          throw new Error(error.message);
        })
      )
      .subscribe(() =>
        this.alerts.open('created', {status:'success'}).subscribe()
      )
  }

  login(userData: IAuthUser) {
    return this.http.post<IUserJwtResponse>(`${API_URL}/auth/auth`, userData)
      .pipe(
        tap((res: IUserJwtResponse)=> {
          localStorage.setItem('token', res.token)
          this.isAuthSig.set(true)
        }),
        catchError((error) => {
          console.error('Login error:', error);
          this.handeError(error);
          throw new Error(error.message);
        })
      )
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthSig.set(false)
    this.router.navigate([''])
    this.alerts.open('Logged out').subscribe()
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return of(!!token);
  }

  redirectToLogin(): Promise<Observable<never>> {
    return this.router.navigate(['']).then(() => of());
  }

  private handeError(err: HttpErrorResponse) {
    // this.alerts.open(err.error.message, {status: 'error'}).subscribe()
    console.error(err.error.message)
  }
}
