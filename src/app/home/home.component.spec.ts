import { async, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, Observer } from 'rxjs';

import { RandomQuoteService } from '../services/random-quote/random-quote.service';
import { HomeComponent } from './home.component';
import { SpinComponent } from '../spin/spin.component';

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, SpinComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setup = (): Record<string, any> => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    const randomQuoteService = fixture.debugElement.injector.get(RandomQuoteService);

    return { fixture, app, randomQuoteService };
  };

  it('should create', () => {
    const { app } = setup();
    expect(app).toBeTruthy();
  });

  it('should display a random quote', fakeAsync(() => {
    const { fixture, randomQuoteService } = setup();
    const mockQuote = [
      { quote: 'I am not in danger, Skyler. I am the danger!', author: 'Walter White' }
    ];
    spyOn(randomQuoteService, 'getRandomQuote').and.returnValue(
      Observable.create(
        (observer: Observer<Array<{ quote: string; author: string }>>) => {
          observer.next(mockQuote);
          return observer;
        }
      )
    );

    tick();

    fixture.detectChanges();
    const asyncElement = fixture.debugElement.nativeElement;
    const author = asyncElement.querySelector('span');
    expect(author.textContent).toBe('Walter White');
  }));
});
