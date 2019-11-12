import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Character } from '../../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private url = 'https://www.breakingbadapi.com/api';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    return throwError('Something bad happened; please try again later.');
  }

  getCharacters(): Observable<Character[]> {
    return this.http
      .get<Character[]>(`${this.url}/characters?category=Breaking+Bad`)
      .pipe(catchError(this.handleError));
  }
}
