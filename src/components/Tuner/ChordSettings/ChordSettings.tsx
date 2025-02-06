import {
  CHROMATIC_NOTES,
  ChromaticNote,
  INTERVALS,
  NoteWrapper,
} from "musicTheory";
import styles from "./ChordSettings.module.scss";
import { useAppState, useAppStateMutations } from "components/AppState";
import { playChord } from "sound/guitarTone";
import { getIntervalRelativeTo } from "musicTheory/NoteWrapper";

const ChordSettings = () => {
  const { fretsToShow, rootNote, selectedNotes } = useAppState();
  const { setFretsToShow, setRootNote, setSelectedNotes } =
    useAppStateMutations();

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

      <div className={styles.formControl}>
        <label htmlFor="note-play-mode">play mode</label>
        <label htmlFor="play-mode-single">
          <input type="radio" name="note-play-mode"></input>
          <span>single</span>
        </label>
        <label htmlFor="play-mode-chord">
          <input type="radio" name="note-play-mode"></input>
          <span>chord</span>
        </label>
      </div>

      <div>
        <h3>current chord</h3>
        <p>
          {selectedNotes.map((note, idx) => (
            <>
              {INTERVALS[getIntervalRelativeTo(note, rootNote)]}
              {idx < selectedNotes.length - 1 && ", "}
            </>
          ))}
        </p>
        <div>
          <button
            onClick={() => {
              playChord(selectedNotes);
            }}
          >
            play chord
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setSelectedNotes([]);
            }}
          >
            clear notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChordSettings;
