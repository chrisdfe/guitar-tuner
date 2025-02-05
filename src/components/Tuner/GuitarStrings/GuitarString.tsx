import { ChordName, ChromaticNote, Note, NoteWrapper } from "musicTheory";
import styles from "./GuitarStrings.module.scss";
import Fret from "./Fret";

interface Props {
  index: number;
  note: Note;
  showOctave: boolean;
  currentChordRoot: ChromaticNote;
  currentChord: ChordName;
  notesInCurrentChord: ChromaticNote[];
  fretsToShow: number;
}

const GuitarString = ({
  note,
  showOctave,
  notesInCurrentChord,
  fretsToShow,
}: Props) => {
  return (
    <div className={styles.guitarString}>
      <div className={styles.guitarStringHeader}>
        <div>
          <strong>{NoteWrapper.wrap(note).toString(showOctave)}</strong>
        </div>
      </div>

      {[...new Array(fretsToShow)].map((_, fret) => (
        <Fret
          key={fret}
          fret={fret}
          stringNote={note}
          notesInCurrentChord={notesInCurrentChord}
        />
      ))}
    </div>
  );
};

export default GuitarString;
