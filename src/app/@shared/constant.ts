import { IPianoKey, IPianoKeyMap } from "./interface";

export const PIANO_KEY_DATA: IPianoKey[] = [
  { whiteKeyId: 16 },
  { whiteKeyId: 18, blackKeyId: 17 },
  { whiteKeyId: 20, blackKeyId: 19 },
  { whiteKeyId: 21 },
  { whiteKeyId: 23, blackKeyId: 22 },
  { whiteKeyId: 25, blackKeyId: 24 },
  { whiteKeyId: 27, blackKeyId: 26 },
  { whiteKeyId: 28 },
  { whiteKeyId: 30, blackKeyId: 29 },
  { whiteKeyId: 32, blackKeyId: 31 },
  { whiteKeyId: 33 },
  { whiteKeyId: 35, blackKeyId: 34 },
  { whiteKeyId: 37, blackKeyId: 36 },
  { whiteKeyId: 39, blackKeyId: 38 },
  { whiteKeyId: 40 },
  { whiteKeyId: 42, blackKeyId: 41 },
  { whiteKeyId: 44, blackKeyId: 43 },
  { whiteKeyId: 45 },
  { whiteKeyId: 47, blackKeyId: 46 },
  { whiteKeyId: 49, blackKeyId: 48 },
  { whiteKeyId: 51, blackKeyId: 50 },
  { whiteKeyId: 52 },
  { whiteKeyId: 54, blackKeyId: 53 },
  { whiteKeyId: 56, blackKeyId: 55 },
  { whiteKeyId: 57 },
  { whiteKeyId: 59, blackKeyId: 58 },
  { whiteKeyId: 61, blackKeyId: 60 },
  { whiteKeyId: 63, blackKeyId: 62 },
  { whiteKeyId: 64 }
]

export const PIANO_KEY_MAP: IPianoKeyMap = {
  16: ["c2"],
  17: ["c2s", "d2f"],
  18: ["d2"],
  19: ["d2s", "e2f"],
  20: ["e2"],
  21: ["f2"],
  22: ["f2s", "g2f"],
  23: ["g2"],
  24: ["g2s", "a2f"],
  25: ["a2"],
  26: ["a2s", "b2f"],
  27: ["b2"],
  28: ["c3"],
  29: ["c3s", "d3f"],
  30: ["d3"],
  31: ["d3s", "e3f"],
  32: ["e3"],
  33: ["f3"],
  34: ["f3s", "g3f"],
  35: ["g3"],
  36: ["g3s", "a3f"],
  37: ["a3"],
  38: ["a3s", "b3f"],
  39: ["b3"],
  40: ["c4"],
  41: ["c4s", "d4f"],
  42: ["d4"],
  43: ["d4s", "e4f"],
  44: ["e4"],
  45: ["f4"],
  46: ["f4s", "g4f"],
  47: ["g4"],
  48: ["g4s", "a4f"],
  49: ["a4"],
  50: ["a4s", "b4f"],
  51: ["b4"],
  52: ["c5"],
  53: ["c5s", "d5f"],
  54: ["d5"],
  55: ["d5s", "e5f"],
  56: ["e5"],
  57: ["f5"],
  58: ["f5s", "g5f"],
  59: ["g5"],
  60: ["g5s", "a5f"],
  61: ["a5"],
  62: ["a5s", "b5f"],
  63: ["b5"],
  64: ["c6"]
}