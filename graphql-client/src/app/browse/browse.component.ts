import { Component, OnInit } from '@angular/core';
import { Character, CharactersService } from '../characters.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  offset: number = 0;
  count: number = 0;
  characters: Character[] = [];

  constructor(private characterService: CharactersService) {
  }

  ngOnInit(): void {
    console.log('INIT Browse');
    this.updateCharacters();
  }

  async updateCharacters() {
    const result = await this.characterService.getCharacters(this.offset);
    this.count = result.count;
    this.characters = result.characters;
  }

  showPrevious() {
    return this.offset > 0;
  }

  showNext() {
    return this.offset + 10 < this.count;
  }

  onPrevious() {
    this.offset -= 10;
    this.updateCharacters();
  }

  onNext() {
    this.offset += 10;
    this.updateCharacters();
  }

}
