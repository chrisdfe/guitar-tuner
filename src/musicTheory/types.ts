export type NoteModifier = '#' | 'b' | null;

export const NOTE_NAMES = ["C", "D", "E", "F", "G", "A", "B"] as const;
export type NoteName = typeof NOTE_NAMES[number];

export const OCTAVES = ['0', '1', '2', '3', '4', '5', '6', '7', '8'] as const;
export type Octave = typeof OCTAVES[number];

export interface OctavelessNote {
  name: NoteName,
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
  "B"
] as const;

export type ChromaticNote = typeof CHROMATIC_NOTES[number];


// TODO - non-map version?
export const ALL_NOTES: Note[] = OCTAVES.flatMap((octave) =>
  CHROMATIC_NOTES.map(note => {
    // e.g "C#/Db",
    if (note.includes('/')) {
      const [firstNote] = note.split('/');
      const name = firstNote[0] as NoteName;
      const modifier = firstNote[1] as NoteModifier;
      return { name, modifier, octave };
    }

    return { name: note as NoteName, octave };
  })
);