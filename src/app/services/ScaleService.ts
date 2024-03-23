import {Injectable} from "@angular/core";
import {ErrorService} from "./ErrorService";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IScale} from "../models/IScale";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScaleService {
  private _baseUrl = 'http://localhost:8080/scale';
  private scalesSubject = new BehaviorSubject<IScale[]>([]);
  private scales$ = this.scalesSubject.asObservable();

  constructor(private _http: HttpClient,
              private errorService: ErrorService) {
    this.getScales();
  }

  getScales() {
    return this._http.get<IScale[]>(`${this._baseUrl}/all`)
      .pipe(
        tap(scales => this.scalesSubject.next(scales)),
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
