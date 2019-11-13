import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { url, handleError } from '../utils';
import { RandomQuote } from '../../models/random-quote';

@Injectable({
  providedIn: 'root'
})
export class RandomQuoteService {
  constructor(private http: HttpClient) {}

  getRandomQuote(author: string): Observable<RandomQuote[]> {
    const quoteUrl = url.concat('/quote/random?author=');
    const splittedAuthor = author.split(' ');
    const separatedAuthor = splittedAuthor
      .map((item, index) => item + (index === splittedAuthor.length - 1 ? '' : '+'))
      .join('');
    return this.http
      .get<RandomQuote[]>(quoteUrl.concat(separatedAuthor))
      .pipe(catchError(handleError));
  }
}
