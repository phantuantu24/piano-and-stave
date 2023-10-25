import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PianoService } from 'src/app/@core-service/piano-service';
import { IPianoNote } from 'src/app/@shared/interface';

@Component({
  selector: 'app-note-info',
  templateUrl: './note-info.component.html',
  styleUrls: ['./note-info.component.scss']
})
export class NoteInfoComponent implements OnDestroy {
  subscription: Subscription;
  currentNote?: IPianoNote;
  alternateNote?: IPianoNote;
  title: string = "Play";

  constructor(
    private pianoService: PianoService
  ) {
    this.subscription = pianoService.notePlayed$.subscribe((pianoNote: IPianoNote | undefined) => {
      this.title = "Now playing";
      this.currentNote = pianoNote!;
      this.alternateNote = this.pianoService.getAlternateNote(pianoNote!.noteId);
    });

    pianoService.isClear$.asObservable().subscribe((isClear: boolean) => {
      if (isClear) {
        this.currentNote = undefined;
        this.alternateNote = undefined;
        this.title = 'Play';
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  playNote(note: IPianoNote) {
    this.pianoService.playNoteByNoteId(note.noteId);
  }

}
