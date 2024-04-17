import {Injectable} from "@angular/core";
import {ErrorService} from "./ErrorService";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {IInterpretation} from "../models/IInterpretation";
import {API_URL} from "../const/constants";

@Injectable({
  providedIn: 'root'
})
export class InterpretationService {
  private _baseUrl = `${API_URL}/interpretation`;
  private interpretationSubject = new BehaviorSubject<IInterpretation[]>([]);
  interpretation$ = this.interpretationSubject.asObservable();

  constructor(private _http: HttpClient,
              private errorService: ErrorService) {
    this.getAll();
  }

  private getAll() {
    this.getAllInterpretations().pipe(
      tap(interpretation =>
        this.interpretationSubject.next(interpretation)),
      catchError(this.errorHandler.bind(this))
    );
  }

  getAllInterpretations():Observable<IInterpretation[]> {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") }

    return this._http.get<IInterpretation[]>(`${this._baseUrl}/all`,
      {params: new HttpParams({fromObject: {limit: 20}}),
        headers: headers})
      .pipe(
        tap(interpre => {
          this.interpretationSubject.next(interpre);
          console.log(interpre);
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  create(interpretation: IInterpretation) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") }

    return this._http.post<IInterpretation>(`${this._baseUrl}/create`, interpretation, {headers: headers})
      .pipe(
        tap(form => {
          const currentForms = this.interpretationSubject.value;
          this.interpretationSubject.next([...currentForms, form]);
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  update(interpretation: IInterpretation) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") }

    return this._http.put<IInterpretation>(`${this._baseUrl}/${interpretation.id}`, interpretation, {headers: headers})
      .pipe(
        tap(inter => {
          const currentInter = this.interpretationSubject.value;
          this.interpretationSubject.next(currentInter.map(intepr =>
            intepr.id == inter.id? inter : intepr
          ));
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  getById(id: number):Observable<IInterpretation> {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") }

    return this._http.get<IInterpretation>(`${this._baseUrl}/${id}`,
      {headers: headers})
      .pipe(

        catchError(this.errorHandler.bind(this))
      )
  }

  getInterpretationsByName(search: string):Observable<IInterpretation[]> {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") }

    return this._http.get<IInterpretation[]>(`${this._baseUrl}/search`,
      {params: new HttpParams({fromObject: {limit: 5}}),
        headers: headers})
      .pipe(
        tap(interpre => {
          this.interpretationSubject.next(interpre);
          console.log(interpre);
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    console.log(error.message)
    return throwError(() => error.message)
  }
}
