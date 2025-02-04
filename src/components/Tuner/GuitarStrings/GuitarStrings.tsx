import { ChordName } from "musicTheory";
import { ChromaticNote, Note } from "../../../musicTheory/types";

import GuitarString from "./GuitarString";

import styles from './GuitarStrings.module.scss';

interface Props {
  strings: Note[];
  showOctave: boolean,
  currentChordRoot: ChromaticNote,
  currentChord: ChordName,
  notesInCurrentChord: ChromaticNote[];
  fretsToShow: number;
}

const GuitarStrings = ({
  strings,
  showOctave,
  currentChordRoot,
  currentChord,
  notesInCurrentChord,
  fretsToShow
}: Props) => {
  return (
    <div className={styles.guitarStrings}>
      {strings.map((note, index) => (
        <GuitarString
          note={note}
          index={index}
          showOctave={showOctave}
          currentChordRoot={currentChordRoot}
          currentChord={currentChord}
          notesInCurrentChord={notesInCurrentChord}
          fretsToShow={fretsToShow}
        />
      ))}
    </div>
  );
};

export default GuitarStrings;

