import {Injectable} from "@angular/core";
import {ErrorService} from "./ErrorService";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IScale} from "../models/IScale";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {API_URL} from "../const/constants";

@Injectable({
  providedIn: 'root'
})
export class ScaleService {
  private _baseUrl = `${API_URL}/scale`;
  private scalesSubject = new BehaviorSubject<IScale[]>([]);
  scales$ = this.scalesSubject.asObservable();

  constructor(private _http: HttpClient,
              private errorService: ErrorService) {
    this.getScales(null);
  }

  getScales(name:string | null) {
    return this._http.get<IScale[]>(`${this._baseUrl}/all`)
      .pipe(
        tap(scales => this.scalesSubject.next(scales)),
        catchError(this.errorHandler.bind(this))
      )
  }

  deleteScale(id: number)  {
    return this._http.delete<IScale>(`${this._baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
