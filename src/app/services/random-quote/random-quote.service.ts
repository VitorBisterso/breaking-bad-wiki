import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RandomQuote } from '../../models/random-quote';
import { url, handleError } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class RandomQuoteService {
  constructor(private http: HttpClient) {}

  getRandomQuote(author = 'all'): Observable<RandomQuote[]> {
    let quoteUrl = url.concat('/quote/random');
    if (author !== 'all') {
      quoteUrl = quoteUrl.concat('?author=');
      const splittedAuthor = author.split(' ');
      const separatedAuthor = splittedAuthor
        .map((item, index) => item + (index === splittedAuthor.length - 1 ? '' : '+'))
        .join('');
      return this.http
        .get<RandomQuote[]>(quoteUrl.concat(separatedAuthor))
        .pipe(catchError(handleError));
    } else {
      return this.http.get<RandomQuote[]>(quoteUrl).pipe(catchError(handleError));
    }
  }
}
