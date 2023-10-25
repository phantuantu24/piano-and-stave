import { Component } from '@angular/core';
import { PianoService } from 'src/app/@core-service/piano-service';
import { SoundService } from 'src/app/@core-service/sound-service';
import { IPianoNote } from 'src/app/@shared/interface';

@Component({
  selector: 'app-note-info',
  templateUrl: './note-info.component.html',
  styleUrls: ['./note-info.component.scss']
})
export class NoteInfoComponent {
  currentNote?: IPianoNote;
  alternateNote?: IPianoNote;
  title: string = "Play";

  constructor(
    private pianoService: PianoService,
    private soundService: SoundService
  ) {
    pianoService.notePlayed$.subscribe((pianoNote: IPianoNote) => {
      this.title = "Now playing";
      this.currentNote = pianoNote;
      this.alternateNote = this.pianoService.getAlternateNote(pianoNote.noteId);
      console.log(this.alternateNote);

    });
  }

  playNote(note: IPianoNote) {
    this.soundService.playNote(note.keyId);
  }

}
