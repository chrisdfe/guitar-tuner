import { Note, NoteWrapper } from "musicTheory";
import styles from "./GuitarStrings.module.scss";
import Fret from "./Fret";
import { useAppState } from "components/AppState";

interface Props {
  index: number;
  note: Note;
}

const GuitarString = ({ note }: Props) => {
  const { showOctave, fretsToShow } = useAppState();

  return (
    <div className={styles.guitarString}>
      <div className={styles.guitarStringHeader}>
        <div>
          <strong>{NoteWrapper.wrap(note).toString(showOctave)}</strong>
        </div>
      </div>

      {[...new Array(fretsToShow)].map((_, fret) => (
        <Fret key={fret} fret={fret} stringNote={note} />
      ))}
    </div>
  );
};

export default GuitarString;
