/* eslint-disable @typescript-eslint/camelcase */
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CharacterService } from './character.service';

describe('CharacterService', () => {
  const mockedCharacters = [
    {
      char_id: 1,
      name: 'name',
      birthday: 'birthday',
      occupation: ['occupation'],
      img: 'Img',
      status: 'Status',
      nickname: 'Nickname',
      appearance: [1, 2],
      portrayed: 'Actor',
      category: ['Breaking Bad']
    },
    {
      char_id: 2,
      name: 'name2',
      birthday: 'birthday2',
      occupation: ['occupation', 'occupation2'],
      img: 'Img2',
      status: 'Status2',
      nickname: 'Nickname2',
      appearance: [1, 2, 3, 4, 5],
      portrayed: 'Actor2',
      category: ['Breaking Bad', 'Better Call Saul']
    }
  ];

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [CharacterService],
      imports: [HttpClientTestingModule]
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setup = (): Record<string, any> => {
    const characterService = TestBed.get(CharacterService);
    const httpTestingController = TestBed.get(HttpTestingController);
    return { characterService, httpTestingController };
  };

  it('should be created', () => {
    const service: CharacterService = TestBed.get(CharacterService);
    expect(service).toBeTruthy();
  });

  it('should get characters', () => {
    const { characterService, httpTestingController } = setup();
    characterService.getCharacters().subscribe(data => {
      expect(data.mapData).toEqual(mockedCharacters);
    });

    const req = httpTestingController.expectOne(
      'https://www.breakingbadapi.com/api/characters?category=Breaking+Bad'
    );

    expect(req.request.method).toBe('GET');

    req.flush({
      mapData: mockedCharacters
    });
  });
});
