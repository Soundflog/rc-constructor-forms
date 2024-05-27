import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {IForm} from "../models/IForm";
import {BehaviorSubject, catchError, delay, Observable, retry, tap, throwError} from "rxjs";
import {ErrorService} from "./ErrorService";
import {API_URL} from "../const/constants";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _baseUrl = `${API_URL}/form`;
  private formsSubject = new BehaviorSubject<IForm[]>([]);
  forms$: Observable<IForm[]> = this.formsSubject.asObservable();

  constructor(private http: HttpClient,
              private errorService: ErrorService) {
    this.getAllForms()
  }

  private getAllForms(): void {
    this.getAll().pipe(
      tap(forms => this.formsSubject.next(forms)),
      catchError(this.errorHandler.bind(this))
    );
  }

  createForm(form: IForm): Observable<IForm> {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
    return this.http.post<IForm>(`${this._baseUrl}/create`, form,
      {headers: headers})
      .pipe(
        tap(form => {
          const currentForms = this.formsSubject.value;
          this.formsSubject.next([...currentForms, form]);
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  updateForm(form: IForm): Observable<IForm> {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
    console.log(form)
    return this.http.put<IForm>(`${this._baseUrl}/${form.id}`, form,
      {headers: headers})
      .pipe(
        tap(form => {
          const currentForms = this.formsSubject.value;
          this.formsSubject.next(currentForms.map(f => f.id === form.id ? form : f));
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  getAll(): Observable<IForm[]> {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
    return this.http.get<IForm[]>(`${this._baseUrl}/all`, {
      headers: headers
    }).pipe(
      tap(forms => {
        console.log(forms)
      }),
      catchError(this.errorHandler.bind(this))
    )
  }

  getById(id: number): Observable<IForm> {
    const headers = { 'Authorization': 'Bearer '+ localStorage.getItem("token") };
    return this.http.get<IForm>(`${this._baseUrl}/${id}`,
      {headers: headers})
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  deleteForm(id: number) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") }

    return this.http.delete(`${this._baseUrl}/${id}`,
      {responseType: "text", headers: headers})
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
