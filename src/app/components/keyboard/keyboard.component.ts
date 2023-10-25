import { Component, EventEmitter, Output } from '@angular/core';
import { PIANO_KEY_DATA } from 'src/app/@shared/constant';
import { IPianoKey } from 'src/app/@shared/interface';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {

  @Output() keyPlayed = new EventEmitter<number>()
  pianoKeys: IPianoKey[] = PIANO_KEY_DATA;

  keyPress(keyNumber: number) {
    this.keyPlayed.emit(keyNumber);
  }
}
