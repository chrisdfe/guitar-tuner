// null === natural
import { CHORD_CHROMATIC_INTERVALS_BY_NAME } from './chords';
import { Note, ALL_NOTES, ChromaticNote, CHROMATIC_NOTE_REVERSE_LOOKUP } from './notes';

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
  asChromaticNote = () => {
    if (this.value.modifier) {
      // e.g Ab
      const baseNote = `${this.value.name}${this.value.modifier}` as keyof typeof CHROMATIC_NOTE_REVERSE_LOOKUP;

      // Get the 'autonym' (that isn't the right word)
      // e.g G#
      const autonymNote = CHROMATIC_NOTE_REVERSE_LOOKUP[baseNote];

      // figure out which is which, to order correctly (sharp always comes first: e.g C#/Db)
      let sharpNote;
      let flatNote;

      if (baseNote.includes("#")) {
        sharpNote = baseNote;
        flatNote = autonymNote;
      } else {
        sharpNote = autonymNote;
        flatNote = baseNote;
      }

      return `${sharpNote}/${flatNote}` as ChromaticNote;
    } else {
      // a natural note
      return this.value.name;
    }
  };

  asFlatChromaticNote = () => {
    const chromaticNote = this.asChromaticNote();

    if (chromaticNote.includes('/')) {
      const [, flat] = chromaticNote.split('/');
      return flat;
    }

    return chromaticNote;
  };

  // static fromString = (noteString: string) => {

  //   // TODO - parse string into Note

  //   const name = noteString[0];

  // };

  public static wrap = (note: Note) => new NoteWrapper(note);
}

export const defaultNote = (): Note => ({ name: "C", octave: "4" });
