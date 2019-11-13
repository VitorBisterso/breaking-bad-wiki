import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { RandomQuoteService } from './random-quote.service';

describe('RandomQuoteService', () => {
  const mockedQuote = [
    {
      // eslint-disable-next-line @typescript-eslint/camelcase
      quote_id: 1,
      quote: 'quote',
      author: 'Walter White'
    }
  ];

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [RandomQuoteService],
      imports: [HttpClientTestingModule]
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setup = (): Record<string, any> => {
    const randomQuoteService = TestBed.get(RandomQuoteService);
    const httpTestingController = TestBed.get(HttpTestingController);
    return { randomQuoteService, httpTestingController };
  };

  it('should be created', () => {
    const service: RandomQuoteService = TestBed.get(RandomQuoteService);
    expect(service).toBeTruthy();
  });

  it('should get a random quote', () => {
    const { randomQuoteService, httpTestingController } = setup();
    randomQuoteService.getRandomQuote('Walter White').subscribe(data => {
      expect(data.mapData).toEqual(mockedQuote);
    });

    const req = httpTestingController.expectOne(
      'https://www.breakingbadapi.com/api/quote/random?author=Walter+White'
    );

    expect(req.request.method).toBe('GET');

    req.flush({
      mapData: mockedQuote
    });
  });
});
