import { Component, OnInit } from '@angular/core';

import { RandomQuote } from '../models/random-quote';
import { RandomQuoteService } from '../services/random-quote/random-quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  randomQuote: RandomQuote;

  constructor(private randomQuoteService: RandomQuoteService) {}

  ngOnInit(): void {
    this.getRandomQuote();
  }

  getRandomQuote(): void {
    this.randomQuoteService
      .getRandomQuote('Walter White')
      .subscribe(randomQuote => (this.randomQuote = randomQuote[0]));
  }
}
