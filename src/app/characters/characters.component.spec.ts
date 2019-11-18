import { async, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, Observer } from 'rxjs';

import { CharacterService } from '../services/character/character.service';
import { CharactersComponent } from './characters.component';
import { SpinComponent } from '../spin/spin.component';
import { CardComponent } from '../card/card.component';

describe('CharactersComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharactersComponent, SpinComponent, CardComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setup = (): Record<string, any> => {
    const fixture = TestBed.createComponent(CharactersComponent);
    const app = fixture.debugElement.componentInstance;
    const characterService = fixture.debugElement.injector.get(CharacterService);

    return { fixture, app, characterService };
  };

  it('should create', () => {
    const { app } = setup();
    expect(app).toBeTruthy();
  });

  it('should display a character', fakeAsync(() => {
    const { fixture, characterService } = setup();
    const mockCharacters = [
      {
        name: 'Walter White',
        occupation: ['Meth dealer'],
        img:
          'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
        status: 'Dead',
        nickname: 'Heisenberg'
      }
    ];
    spyOn(characterService, 'getCharacters').and.returnValue(
      Observable.create(
        (
          observer: Observer<
            Array<{
              name: string;
              occupation: Array<string>;
              img: string;
              status: string;
              nickname: string;
            }>
          >
        ) => {
          observer.next(mockCharacters);
          return observer;
        }
      )
    );

    tick();

    fixture.detectChanges();
    const asyncElement = fixture.debugElement.nativeElement;
    const nickname = asyncElement.querySelector('span');
    expect(nickname.textContent).toBe('Heisenberg');
  }));
});
