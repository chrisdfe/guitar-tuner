// null === natural
import { CHORD_CHROMATIC_INTERVALS_BY_NAME } from "./chords";
import {
  Note,
  ALL_NOTES,
  ChromaticNote,
  CHROMATIC_NOTE_REVERSE_LOOKUP,
  CHROMATIC_NOTES,
} from "./notes";

export const defaultNote = (): Note => ({ name: "C", octave: "4" });

export const notesMatch = (noteA: Note, noteB: Note) =>
  noteA.name === noteB.name &&
  noteA.modifier === noteB.modifier &&
  noteA.octave === noteB.octave;

// TODO - type assertions
export const noteAsChromaticNote = (note: Note) => {
  if (note.modifier) {
    // e.g Ab
    const baseNote =
      `${note.name}${note.modifier}` as keyof typeof CHROMATIC_NOTE_REVERSE_LOOKUP;

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
    return note.name;
  }
};

export const getIntervalRelativeTo = (note: Note, rootNote: ChromaticNote) => {
  const rootNoteIdx = CHROMATIC_NOTES.findIndex(
    (otherNote) => otherNote === rootNote
  );
  const noteChromaticNote = noteAsChromaticNote(note);
  const noteChromaticNoteIdx = CHROMATIC_NOTES.findIndex(
    (otherNote) => otherNote === noteChromaticNote
  );

  // TODO - account for octave as well
  let interval = noteChromaticNoteIdx - rootNoteIdx;
  if (interval < 0) {
    interval += 12;
  }

  return interval;
};

export default class NoteWrapper {
  value: Note;

  constructor(note: Note) {
    this.value = { ...note };
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
    let result = `${this.value.name}${this.value.modifier ?? ""}`;

    if (showOctave) {
      result += this.value.octave;
    }

    return result;
  };

  getIdx = () =>
    ALL_NOTES.findIndex(
      (note) => NoteWrapper.wrap(note).toString() === this.toString()
    );

  // TODO - type assertions
  asChromaticNote = () => noteAsChromaticNote(this.value);

  asFlatChromaticNote = () => {
    const chromaticNote = this.asChromaticNote();

    if (chromaticNote.includes("/")) {
      const [, flat] = chromaticNote.split("/");
      return flat;
    }

    return chromaticNote;
  };

  // static fromString = (noteString: string) => {

  //   // TODO - parse string into Note

  //   const name = noteString[0];

  // };

  matches = (otherNote: Note) => notesMatch(this.value, otherNote);

  public static wrap = (note: Note) => new NoteWrapper(note);
}
