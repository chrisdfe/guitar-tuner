import classNames from "classnames";

import { ChromaticNote, Note, NoteWrapper } from "musicTheory";
import styles from "./GuitarStrings.module.scss";
import { pluckNote } from "sound/guitarTone";
import { useAppState, useAppStateMutations } from "components/AppState";

interface Props {
  fret: number;
  stringNote: Note;
}

// TODO - put elsewhere
const isStringNote = (note: Note, strings: Note[]) =>
  strings.find((string) => NoteWrapper.wrap(string).matches(note)) !==
  undefined;

const Fret = ({ fret, stringNote }: Props) => {
  const { notesInCurrentChord, selectedNotes } = useAppState();
  const { addSelectedNote, removeSelectedNote } = useAppStateMutations();

  const fretWrappedNote = NoteWrapper.wrap(stringNote).add(fret);
  const fretNote = fretWrappedNote.value;
  const chromaticNote = fretWrappedNote.asChromaticNote();
  const flatChromaticNote = fretWrappedNote.asFlatChromaticNote();

  const isOpenString = fret === 0;
  const isHighlighted = notesInCurrentChord.includes(chromaticNote);
  const isSelected = selectedNotes.includes(fretNote);

  return (
    <div className={styles.guitarStringFretWrapper}>
      <div
        className={classNames(styles.guitarStringFret, {
          [styles.isOpenString]: isOpenString,
          [styles.isHighlighted]: isHighlighted,
          [styles.isSelected]: isSelected,
        })}
        key={fret}
        onClick={() => {
          pluckNote(fretWrappedNote.value);

          if (isSelected) {
            removeSelectedNote(fretNote);
          } else {
            addSelectedNote(fretNote);
          }
        }}
      >
        <div>{flatChromaticNote}</div>
      </div>
    </div>
  );
};

export default Fret;
