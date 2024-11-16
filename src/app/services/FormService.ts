import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {IForm} from "../models/IForm";
import {BehaviorSubject, catchError, delay, map, Observable, retry, tap, throwError} from "rxjs";
import {ErrorService} from "./ErrorService";
import {API_URL} from "../const/constants";
import {forms} from "../data/forms";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _baseUrl = `${API_URL}/form`;
  private formsSubject = new BehaviorSubject<IForm[]>([]);
  forms$: Observable<IForm[]> = this.formsSubject.asObservable();

  constructor(private http: HttpClient,
              private errorService: ErrorService) {
    // this.getAllForms()
  }

  // private getAllForms(): void {
  //   this.getAll().pipe(
  //     tap(forms => this.formsSubject.next(forms)),
  //     catchError(this.errorHandler.bind(this))
  //   );
  // }

  createForm(form: IForm): Observable<IForm> {
    return this.http.post<IForm>(`${this._baseUrl}/create`, form)
      .pipe(
        tap(form => {
          const currentForms = this.formsSubject.value;
          this.formsSubject.next([...currentForms, form]);
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  updateForm(form: IForm): Observable<IForm> {
    console.log(form)
    return this.http.put<IForm>(`${this._baseUrl}/${form.id}`, form)
      .pipe(
        tap(form => {
          const currentForms = this.formsSubject.value;
          this.formsSubject.next(currentForms.map(f => f.id === form.id ? form : f));
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  getAll(): Observable<IForm[]> {
    return this.formsSubject;
    // return this.http.get<IForm[]>(`${this._baseUrl}/all`).pipe(
    //   tap(forms => {
    //     console.log(forms)
    //   }),
    //   catchError(this.errorHandler.bind(this))
    // )
  }

  getById(id: number): Observable<IForm>{
    return this.http.get<IForm>(`${this._baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  deleteForm(id: number) {
    return this.http.delete(`${this._baseUrl}/${id}`,
      {responseType: "text"})
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
