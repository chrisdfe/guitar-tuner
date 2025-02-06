import { NoteWrapper } from "musicTheory";
import { useAppState } from "components/AppState";

import GuitarString from "./GuitarString";

import styles from "./GuitarStrings.module.scss";

const GuitarStrings = () => {
  const { fretsToShow, strings } = useAppState();

  return (
    <div className={styles.guitarStrings}>
      <div className={styles.fretNumbers}>
        {[...new Array(fretsToShow + 1)].map((_, index) => (
          <div className={styles.fretNumber}>{index > 0 ? index : ""}</div>
        ))}
      </div>

      {strings.map((note, index) => (
        <GuitarString
          key={NoteWrapper.wrap(note).toString()}
          note={note}
          index={index}
        />
      ))}
    </div>
  );
};

export default GuitarStrings;
