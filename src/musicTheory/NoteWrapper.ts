// null === natural
import { Note, ALL_NOTES, ChromaticNote } from './types';

export default class NoteWrapper {
  value: Note;

  constructor(note: Note) {
    this.value = note;
  }

  add = (amount: number) => {
    const idx = this.getIdx();
    const newIdx = idx + amount;
    if (newIdx < ALL_NOTES.length) {
      this.value = ALL_NOTES[newIdx];
    }

    return this;
  };

  hasModifier = () => !!this.value.modifier;

  toString = (showOctave: boolean = true) => {
    let result = `${this.value.name}${this.value.modifier ?? ''}`;

    if (showOctave) {
      result += this.value.octave;
    }

    return result;
  };

  getIdx = () => ALL_NOTES.findIndex(note => NoteWrapper.wrap(note).toString() === this.toString());

  // TODO - type assertions
  asChromaticNote = () => `${this.value.name}${this.value.modifier ?? ''}` as ChromaticNote;

  // static fromString = (noteString: string) => {

  //   // TODO - parse string into Note

  //   const name = noteString[0];

  // };

  public static wrap = (note: Note) => new NoteWrapper(note);
}

export const defaultNote = (): Note => ({ name: "C", octave: "4" });
