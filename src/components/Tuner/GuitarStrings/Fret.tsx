import classNames from "classnames";

import { ChromaticNote, Note, NoteWrapper } from "musicTheory";
import styles from "./GuitarStrings.module.scss";
import { pluckNote } from "sound/guitarTone";

interface Props {
  fret: number;
  stringNote: Note;
  notesInCurrentChord: ChromaticNote[];
}

const Fret = ({ fret, stringNote, notesInCurrentChord }: Props) => {
  const fretWrappedNote = NoteWrapper.wrap(stringNote).add(fret + 1);
  const chromaticNote = fretWrappedNote.asChromaticNote();
  const flatChromaticNote = fretWrappedNote.asFlatChromaticNote();

  return (
    <div className={styles.guitarStringFretWrapper}>
      <div
        className={classNames(styles.guitarStringFret, {
          [styles.isHighlighted]: notesInCurrentChord.includes(chromaticNote),
        })}
        key={fret}
        onClick={() => {
          pluckNote(fretWrappedNote.value);
        }}
      >
        <div>{flatChromaticNote}</div>
      </div>
    </div>
  );
};

export default Fret;
