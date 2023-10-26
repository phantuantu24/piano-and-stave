export interface IPianoKey {
  whiteKeyId: number;
  blackKeyId?: number;
}

export interface IPianoKeyMap {
  [key: number]: string[]
}

export interface IPianoNoteMap {
  [key: string]: string;
}

export interface IPianoNote {
  keyId: number;
  noteId: string;
  accidentalSymbol: string;
  fullName: string;
  octave: number;
  shouldAdd?: boolean; 
}
