import { Component, OnInit } from '@angular/core';

import { CharacterService } from '../services/character.service';
import { Character } from '../models/character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  characters: Character[];

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService
      .getCharacters()
      .subscribe(characters => (this.characters = characters));
  }
}
