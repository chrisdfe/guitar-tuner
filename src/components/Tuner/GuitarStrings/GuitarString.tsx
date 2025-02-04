import classNames from 'classnames';
import { ChordName, ChromaticNote, Note, NoteWrapper } from 'musicTheory';
import styles from './GuitarStrings.module.scss';

interface Props {
  index: number;
  note: Note;
  showOctave: boolean;
  currentChordRoot: ChromaticNote,
  currentChord: ChordName,
  notesInCurrentChord: ChromaticNote[];
  fretsToShow: number;
}

const GuitarString = ({ note, showOctave, notesInCurrentChord, fretsToShow }: Props) => {
  const chromaticNote = NoteWrapper.wrap(note).asChromaticNote();

  return (
    <div className={styles.guitarString}>
      <div className={styles.guitarStringHeader}>
        <div><strong>{NoteWrapper.wrap(note).toString(showOctave)}</strong></div>
      </div>

      {[...new Array(fretsToShow)].map((_, fret) => {
        const fretWrappedNote = NoteWrapper.wrap(note).add(fret + 1);

        return (
          <div className={styles.guitarStringFretWrapper}>
            <div
              className={classNames(styles.guitarStringFret, {
                [styles.isHighlighted]: notesInCurrentChord.includes(fretWrappedNote.asChromaticNote()),
              })}
              key={fret}
            >
              <div>{fretWrappedNote.toString(showOctave)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GuitarString;