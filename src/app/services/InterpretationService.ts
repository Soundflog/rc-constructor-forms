import {Injectable} from "@angular/core";
import {ErrorService} from "./ErrorService";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {IInterpretation} from "../models/form/IInterpretation";

@Injectable({
  providedIn: 'root'
})
export class InterpretationService {
  private _baseUrl = 'http://localhost:8080/interpretation';
  private interpretationSubject = new BehaviorSubject<IInterpretation[]>([]);
  interpretation$ = this.interpretationSubject.asObservable();

  constructor(private _http: HttpClient,
              private errorService: ErrorService) {
    this.getAll();
  }

  private getAll() {
    this.getInterpretations().pipe(
      tap(interpretation =>
        this.interpretationSubject.next(interpretation)),
      catchError(this.errorHandler.bind(this))
    );
  }

  getInterpretations():Observable<IInterpretation[]> {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") }

    return this._http.get<IInterpretation[]>(`${this._baseUrl}/all`,
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
