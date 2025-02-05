import { Note, NoteWrapper } from "musicTheory";
import * as Tone from "tone";

const synth = new Tone.PolySynth().toDestination();

export const pluckNote = (note: Note) => {
  const noteAsString = NoteWrapper.wrap(note).toString();

  synth.triggerAttackRelease(noteAsString, "8n");
};

export const playChord = (notes: Note[]) => {
  notes.forEach((note) => {
    pluckNote(note);
  });
};
