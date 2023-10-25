import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PIANO_KEY_MAP } from "../@shared/constant";
import { IPianoNote, IPianoNoteMap } from "../@shared/interface";

@Injectable()
export class PianoService {
  private pianoKeyMap = PIANO_KEY_MAP;
  private pianoNoteMap: IPianoNoteMap = {};

  // Observable sources
  private pianoNotePlayedSource = new Subject<IPianoNote>();
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
      const octave: number = Number(noteId[1]);
      const accidentalSymbol: string = this.checkAccidentalSymbolFromNote(notes[1]);
      const fullName: string = `${notes[1][0].toUpperCase()}${accidentalSymbol}`;
      alternateNote = {
        keyId, accidentalSymbol, fullName, octave,
        noteId: notes[1]
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