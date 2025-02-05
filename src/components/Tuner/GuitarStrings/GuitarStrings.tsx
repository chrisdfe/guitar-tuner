import { NoteWrapper } from "musicTheory";
import GuitarString from "./GuitarString";

import styles from "./GuitarStrings.module.scss";
import { useAppState } from "components/AppState";

const GuitarStrings = () => {
  const { strings } = useAppState();

  return (
    <div className={styles.guitarStrings}>
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
