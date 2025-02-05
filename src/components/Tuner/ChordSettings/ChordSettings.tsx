import { CHROMATIC_NOTES, ChromaticNote, NoteWrapper } from "musicTheory";
import styles from "./ChordSettings.module.scss";

interface Props {
  fretsToShow: number;
  setFretsToShow: (frets: number) => void;
  rootNote: ChromaticNote;
  setRootNote: (note: ChromaticNote) => void;
}

const ChordSettings = ({
  fretsToShow,
  setFretsToShow,
  rootNote,
  setRootNote,
}: Props) => {
  return (
    <div className={styles.panel}>
      <div className={styles.formControl}>
        <label htmlFor="frets-to-show"># of frets</label>
        <br />
        <input
          type="number"
          value={fretsToShow}
          id="frets-to-show"
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);

            setFretsToShow(value);
          }}
        />
      </div>

      <div className={styles.formControl}>
        <label htmlFor="root-note">root</label>
        <select
          id="root-note"
          value={rootNote}
          onChange={(e) => {
            const note = (e.target as HTMLSelectElement).value as ChromaticNote;
            setRootNote(note);
          }}
        >
          {CHROMATIC_NOTES.map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ChordSettings;
