import { Component, OnInit } from '@angular/core';
import { PianoService } from './@core-service/piano-service';
import { IPianoNote } from './@shared/interface';
import { SoundService } from './@core-service/sound-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private pianoService: PianoService,
    private soundService: SoundService,
  ) {
    pianoService.notePlayed$.subscribe((note: IPianoNote | undefined) => this.soundService.playNote(note!.keyId));
  }

  ngOnInit(): void {
    this.soundService.initialize();
  }

  handleKeyPlayed(keyPlayedId: number) {
    this.pianoService.playNoteByKeyId(keyPlayedId);
  }
}
