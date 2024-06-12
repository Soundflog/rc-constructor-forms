import {Injectable} from "@angular/core";
import {ErrorService} from "./ErrorService";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {IInterpretation} from "../models/IInterpretation";
import {API_URL} from "../const/constants";
import {IScaleInterpretationResponse} from "../models/ScaleInterpretationResponse";

@Injectable({
  providedIn: 'root'
})
export class InterpretationService {
  private _baseUrl = `${API_URL}/interpretation`;
  private interpretationSubject = new BehaviorSubject<IScaleInterpretationResponse[]>([]);
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

  getAllInterpretations(): Observable<IScaleInterpretationResponse[]> {
    return this._http.get<IScaleInterpretationResponse[]>(`${this._baseUrl}/all`,
      {
        params: new HttpParams({fromObject: {limit: 20}})
      })
      .pipe(
        tap(interpre => {
          this.interpretationSubject.next(interpre);
          console.log(interpre);
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  create(interpretation: IScaleInterpretationResponse) {
    return this._http.post<IScaleInterpretationResponse>(`${this._baseUrl}/create`, interpretation)
      .pipe(
        tap(form => {
          const currentForms = this.interpretationSubject.value;
          this.interpretationSubject.next([...currentForms, form]);
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  update(interpretation: IScaleInterpretationResponse) {
    return this._http.put<IScaleInterpretationResponse>(`${this._baseUrl}/${interpretation.id}`, interpretation)
      .pipe(
        tap(inter => {
          const currentInter = this.interpretationSubject.value;
          this.interpretationSubject.next(currentInter.map(intepr =>
            intepr.id == inter.id ? inter : intepr
          ));
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  getById(id: number): Observable<IScaleInterpretationResponse> {
    return this._http.get<IScaleInterpretationResponse>(`${this._baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  delete(id: number) {
    return this._http.delete<IScaleInterpretationResponse>(`${this._baseUrl}/${id}`)
      .pipe(
        tap(inter => {
          const currentInter = this.interpretationSubject.value;
          this.interpretationSubject.next(currentInter.filter(intepr => intepr.id != inter.id));
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  getInterpretationsByName(search: string): Observable<IScaleInterpretationResponse[]> {
    const headers = {'Authorization': 'Bearer ' + localStorage.getItem("token")}

    return this._http.get<IScaleInterpretationResponse[]>(`${this._baseUrl}/search`,
      {
        params: new HttpParams({fromObject: {limit: 5}}),
        headers: headers
      })
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
