import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { NotationService } from 'src/app/@core-service/notation-service';
import { PianoService } from 'src/app/@core-service/piano-service';
import { SoundService } from 'src/app/@core-service/sound-service';
import { IPianoNote } from 'src/app/@shared/interface';

declare var $: any;

@Component({
  selector: 'app-notation',
  templateUrl: './notation.component.html',
  styleUrls: ['./notation.component.scss']
})
export class NotationComponent implements OnInit, AfterViewChecked {
  notationAsSVG: any;
  maxNotes: number = 16;

  constructor(
    private pianoService: PianoService,
    private notationService: NotationService,
    private soundService: SoundService
  ) {
    this.pianoService.notePlayed$.subscribe((note: IPianoNote | undefined) => this.handleNotePlayed(note!));
  }

  ngOnInit(): void {
    this.notationAsSVG = this.notationService.renderNotation();
  }

  ngAfterViewChecked() {
    for (let i: number = 0; i < this.maxNotes; i++) {
      const resHiddenElement: HTMLElement | null = document.getElementById(`rest-hidden-${i}`);
      const resHiddenElementWhenAddNew: HTMLElement | null = document.getElementById(`rest-${i}`);
      resHiddenElement && (resHiddenElement.style.display = "none");
      resHiddenElementWhenAddNew && (resHiddenElementWhenAddNew.style.display = "none");
    }

    $("g.note").off().on('click', (res: any) => {
      console.log('trriger note click', res.delegateTarget.id);
      const noteIndex: number = res.delegateTarget.id;
      this.noteClicked(noteIndex);
    })

    $("g.note").mouseenter(((res: any) => {
      res.delegateTarget.style.fill = '#ff9800';
    })).mouseleave(((res: any) => {
      res.delegateTarget.style.fill = '#000';
    }))
  }

  handleNotePlayed(note: IPianoNote) {
    this.notationService.addNote(note);
    this.notationAsSVG = this.notationService.renderNotation();
  }

  noteClicked(noteIndex: number) {
    const note: IPianoNote = this.notationService.notes[noteIndex];
    this.soundService.playNote(note.keyId);
  }

  handleClear() {
    this.notationService.clear();
    this.notationAsSVG = this.notationService.renderNotation();
    this.pianoService.isClear$.next(true);
  }

}
