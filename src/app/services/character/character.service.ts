import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { url, handleError } from '../utils';
import { Character } from '../../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http
      .get<Character[]>(`${url}/characters?category=Breaking+Bad`)
      .pipe(catchError(handleError));
  }
}
