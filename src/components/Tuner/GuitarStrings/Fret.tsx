import classNames from 'classnames';

import { ChromaticNote, Note, NoteWrapper } from 'musicTheory';
import styles from './GuitarStrings.module.scss';

interface Props {
  fret: number;
  note: Note;
  notesInCurrentChord: ChromaticNote[];
}

const Fret = ({ fret, note, notesInCurrentChord }: Props) => {
  const fretWrappedNote = NoteWrapper.wrap(note).add(fret + 1);
  const chromaticNote = fretWrappedNote.asChromaticNote();
  const flatChromaticNote = fretWrappedNote.asFlatChromaticNote();

  return (
    <div className={styles.guitarStringFretWrapper}>
      <div
        className={classNames(styles.guitarStringFret, {
          [styles.isHighlighted]: notesInCurrentChord.includes(chromaticNote),
        })}
        key={fret}
      >
        <div>{flatChromaticNote}</div>
      </div>
    </div>
  );
};

export default Fret;