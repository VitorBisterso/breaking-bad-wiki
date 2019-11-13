import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const url = 'https://www.breakingbadapi.com/api';

const handleError = (error: HttpErrorResponse): Observable<never> => {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
  }

  return throwError('Something bad happened; please try again later.');
};

export { url, handleError };
