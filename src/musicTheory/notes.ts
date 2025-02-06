export type NoteModifier = "#" | "b" | null;

export const NOTE_NAMES = ["C", "D", "E", "F", "G", "A", "B"] as const;
export type NoteName = (typeof NOTE_NAMES)[number];

export const OCTAVES = ["0", "1", "2", "3", "4", "5", "6", "7", "8"] as const;
export type Octave = (typeof OCTAVES)[number];

export interface OctavelessNote {
  name: NoteName;
  modifier?: NoteModifier;
}

export type Note = OctavelessNote & {
  octave: Octave;
};

// TODO - sharps as well
export const CHROMATIC_NOTES = [
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
  "A",
  "A#/Bb",
  "B",
] as const;

export type ChromaticNote = (typeof CHROMATIC_NOTES)[number];

export type FlatChromaticNote = "Db" | "Eb" | "Gb" | "Ab" | "Bb";
export type SharpChromaticNote = "C#" | "D#" | "F#" | "G#" | "A#";

export type ChromaticNoteTuple = [FlatChromaticNote, SharpChromaticNote];

export const INTERVALS = [
  "root",
  "min 2nd",
  "maj 2nd",
  "min 3rd",
  "maj 3rd",
  "4th",
  "tritone",
  "5th",
  "min 6th",
  "maj 6th",
  "min 7th",
  "maj 7th",
] as const;

// Given a note with a sharp or flat (eg. C#), gives its
export const CHROMATIC_NOTE_REVERSE_LOOKUP = {
  // C#/Db
  "C#": "Db",
  Db: "C#",
  // D#/Eb
  "D#": "Eb",
  Eb: "D#",
  // F#/Db
  "F#": "Gb",
  Gb: "F#",
  // G#/Ab
  "G#": "Ab",
  Ab: "G#",
  // A#/Gb
  "A#": "Bb",
  Bb: "A#",
};

// TODO - non-map version?
export const ALL_NOTES: Note[] = OCTAVES.flatMap((octave) =>
  CHROMATIC_NOTES.map((note) => {
    // e.g "C#/Db",
    if (note.includes("/")) {
      const [firstNote] = note.split("/");
      const name = firstNote[0] as NoteName;
      const modifier = firstNote[1] as NoteModifier;
      return { name, modifier, octave };
    }

    return { name: note as NoteName, octave };
  })
);
