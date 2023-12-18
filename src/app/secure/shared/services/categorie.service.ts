import { CategorieComponent } from './../../production/categorie/categorie.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestReponse } from 'src/app/core/interfaces/rest-response';
import { environment } from 'src/environments/environment.development';
import { CategorieResponse } from '../interfaces/response/all';
import { Observable, throwError,tap, catchError } from 'rxjs';

@Injectable()
export class CategorieService {

  constructor(private http:HttpClient) { }



  limit?: number;

  private urlApi = 'http://127.0.0.1:8000/api/categorie'
  private urlApiStore = "/store"

  all(urls?:string):Observable<RestReponse<CategorieResponse[]>>{
    //console.log(CategorieComponent)
    urls = urls?? `${this.urlApi}?page=${this.limit}`;
    return this.http.get<RestReponse<CategorieResponse[]>>(urls).pipe(
      tap(response=>console.log(response)),
      catchError(this.handleError)
    );
  }

  store(libelle:string,unite:string):Observable<any>{

   return this.http.post(`${this.urlApi}${this.urlApiStore}`,{libelle,unite});

  }

 update(id: number, libelle: string, unite: string): Observable<any> {
    return this.http.put(`${this.urlApi}/${id}`, { libelle, unite });
  }

  delete(){}
  byLibelle(){}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }



}
