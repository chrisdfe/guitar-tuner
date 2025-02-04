import { CHROMATIC_NOTES, ChromaticNote } from "./notes";

// note - uses chromatic intervals
export const CHORD_CHROMATIC_INTERVALS_BY_NAME = {
  'major': [0, 4, 7],
  'minor': [0, 3, 7]
};

export type ChordName = keyof typeof CHORD_CHROMATIC_INTERVALS_BY_NAME;

export const getChordChromaticIntervals = (name: ChordName) => CHORD_CHROMATIC_INTERVALS_BY_NAME[name];

export const getChromaticNoteAtIIntervalFromNote = (note: ChromaticNote, interval: number) => {
  const clampedInterval = interval % 12;

  const noteIndex = CHROMATIC_NOTES.indexOf(note);

  let finalInterval = noteIndex + clampedInterval;
  if (finalInterval >= CHROMATIC_NOTES.length) {
    finalInterval -= CHROMATIC_NOTES.length;
  }

  return CHROMATIC_NOTES[finalInterval];
};

export const getChromaticNotesInChord = (root: ChromaticNote, chord: ChordName) => {
  const intervals = getChordChromaticIntervals(chord);

  return intervals.map(interval => getChromaticNoteAtIIntervalFromNote(root, interval));
};