import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {IForm} from "../models/IForm";
import {BehaviorSubject, catchError, delay, Observable, retry, tap, throwError} from "rxjs";
import {ErrorService} from "./ErrorService";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _baseUrl = 'http://localhost:8080/form';
  private formsSubject = new BehaviorSubject<IForm[]>([]);
  forms$: Observable<IForm[]> = this.formsSubject.asObservable();

  constructor(private http: HttpClient,
              private errorService: ErrorService) {
    this.getAllForms()
  }

  private getAllForms(): void {
    this.getAll().subscribe(
      forms => this.formsSubject.next(forms),
      error => {
        // Handle error if needed
        console.error('Error occurred while fetching forms:', error);
      }
    );
  }

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

  getAll(): Observable<IForm[]> {
    return this.http.get<IForm[]>(`${this._baseUrl}/all`, {
      params: new HttpParams({
        fromObject: {limit: 5}
      })
    }).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  getById(id: number): Observable<IForm> {
    return this.http.get<IForm>(`${this._baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
