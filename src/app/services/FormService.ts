import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {IForm} from "../models/IForm";
import {catchError, delay, Observable, retry, tap, throwError} from "rxjs";
import {ErrorService} from "./ErrorService";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _baseUrl = 'http://localhost:8080/form';
  constructor(private http: HttpClient,
              private errorService: ErrorService) {
  }

  forms: IForm[] = []

  createForm(form: IForm): Observable<IForm> {
    return this.http.post<IForm>(`${this._baseUrl}/create`, form)
      .pipe(
        tap(form => this.forms.push(form))
      )
  }

  getAll(): Observable<IForm[]> {
    return this.http.get<IForm[]>(`${this._baseUrl}/all`, {
      params: new HttpParams({
        fromObject: {limit: 5}
      })
    }).pipe(
      delay(1000),
      retry(2),
      tap(forms => this.forms = forms),
      catchError(this.errorHandler.bind(this))
    )
  }

  getById(id: number): Observable<IForm> {
    return this.http.get<IForm>(`${this._baseUrl}/${id}`)
      .pipe(
        tap(form => this.forms.push(form)),
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
