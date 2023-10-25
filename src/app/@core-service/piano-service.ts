import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { PIANO_KEY_MAP } from "../@shared/constant";
import { IPianoNote, IPianoNoteMap } from "../@shared/interface";

@Injectable()
export class PianoService {
  private pianoKeyMap = PIANO_KEY_MAP;
  private pianoNoteMap: IPianoNoteMap = {};

  // Observable sources
  pianoNotePlayedSource = new Subject<IPianoNote | undefined>();
  isClear$ = new BehaviorSubject<boolean>(false);
  // Observable streams
  notePlayed$ = this.pianoNotePlayedSource.asObservable();

  constructor() {
    Object.keys(this.pianoKeyMap).forEach((keyId: string) => {
      // get list note based on note's key
      const pianoKeyMapValue: string[] = this.pianoKeyMap[Number(keyId)];
      // map to pianoNoteMap
      pianoKeyMapValue.forEach((noteValue: string) => this.pianoNoteMap[noteValue] = keyId);
    })
  }

  playNoteByKeyId(keyId: number): void {
    const note: IPianoNote = this.getNoteByKeyId(keyId);
    this.pianoNotePlayedSource.next(note);
  }

  playNoteByNoteId(noteId: string): void {
    const note: IPianoNote = this.getNoteByNoteId(noteId);
    this.pianoNotePlayedSource.next(note);
  }

  getNoteByNoteId(noteId: string): IPianoNote {
    if (this.pianoNoteMap.hasOwnProperty(noteId)) {
      const keyId: number = Number(this.pianoNoteMap[noteId]);
      const accidentalSymbol: string = this.checkAccidentalSymbolFromNote(noteId);
      const fullName: string = `${noteId[0].toUpperCase()}${accidentalSymbol}`;
      const octave: number = Number(noteId[1]);
      return { keyId, noteId, accidentalSymbol, fullName, octave };
    } else {
      throw new Error("Invalid noteId.");
    }
  }

  getNoteByKeyId(keyId: number): IPianoNote {
    if (this.pianoKeyMap.hasOwnProperty(keyId)) {
      // default to first note for keyId
      const noteId: string = this.pianoKeyMap[keyId][0];
      const accidentalSymbol: string = this.checkAccidentalSymbolFromNote(noteId);
      const fullName: string = `${noteId[0].toUpperCase()}${accidentalSymbol}`;
      const octave: number = Number(noteId[1]);
      return { keyId, noteId, accidentalSymbol, fullName, octave };
    } else {
      throw new Error("Invalid keyId. The valid range of keyId is 16 to 64.");
    }
  }

  getAlternateNote(noteId: string): IPianoNote {
    let alternateNote: Partial<IPianoNote> | undefined = undefined;
    // get keyId from value
    const keyId: number = Number(this.pianoNoteMap[noteId]);
    // get array of value with keyId
    const notes: string[] = this.pianoKeyMap[keyId];

    if (notes.length > 1) {
      const isSameNote: boolean = notes[0] === noteId;
      const validNote: string = isSameNote ? notes[1]: notes[0];

      const octave: number = Number(noteId[1]);
      const accidentalSymbol: string = this.checkAccidentalSymbolFromNote(validNote);
      const fullName: string = `${validNote[0].toUpperCase()}${accidentalSymbol}`;
      alternateNote = {
        keyId, accidentalSymbol, fullName, octave,
        noteId: validNote
      }
    }

    return alternateNote as IPianoNote;
  }

  checkAccidentalSymbolFromNote(noteId: string): string { 
    let rs: string = '';
    if (noteId.length === 3) {
      const thirdCharacter: string = noteId[2];
      const accidentalSymbol: Record<string, string> = {
        ['s']: '\u266F',
        ['f']: '\u266D'
      }
      rs = accidentalSymbol[thirdCharacter];
    }
    return rs;
  }
}