import { async, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, Observer } from 'rxjs';

import { HomeComponent } from './home.component';
import { CharacterService } from '../services/character/character.service';

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setup = (): Record<string, any> => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    const characterService = fixture.debugElement.injector.get(CharacterService);

    return { fixture, app, characterService };
  };

  it('should create', () => {
    const { app } = setup();
    expect(app).toBeTruthy();
  });

  it('should display a character name', fakeAsync(() => {
    const { fixture, characterService } = setup();
    const mockCharacter = [{ name: 'name' }];
    spyOn(characterService, 'getCharacters').and.returnValue(
      Observable.create((observer: Observer<Array<{ name: string }>>) => {
        observer.next(mockCharacter);
        return observer;
      })
    );

    tick();

    fixture.detectChanges();
    const asyncElement = fixture.debugElement.nativeElement;
    const characterName = asyncElement.querySelector('p');
    expect(characterName.textContent).toBe('name');
  }));
});
