import { useMemo, useState } from 'react';

import { ChromaticNote, Note } from 'musicTheory/types';
import { ChordName, getChromaticNotesInChord } from 'musicTheory';

import { GuitarStrings } from './GuitarStrings';
import { ChordSettings } from './ChordSettings';


import styles from './Tuner.module.scss';

const createDefaultStringsState = (): Note[] => (
  [
    { name: "E", octave: "4" },
    { name: "A", octave: "4" },
    { name: "D", octave: "4" },
    { name: "G", octave: "5" },
    { name: "B", octave: "5" },
    { name: "E", octave: "6" },
  ]
);

const Tuner = () => {
  const [currentChordRoot] = useState<ChromaticNote>('C');
  const [currentChord] = useState<ChordName>('major');
  const [showOctave, _setShowOctave] = useState(false);
  const [strings, _setStrings] = useState(createDefaultStringsState);
  const [fretsToShow, setFretsToShow] = useState(6);

  const notesInCurrentChord = useMemo(() => (getChromaticNotesInChord(currentChordRoot, currentChord)), [currentChordRoot, currentChord]);

  return (
    <div className={styles.tuner}>
      <GuitarStrings
        strings={strings}
        showOctave={showOctave}
        currentChordRoot={currentChordRoot}
        currentChord={currentChord}
        notesInCurrentChord={notesInCurrentChord}
        fretsToShow={fretsToShow}
      />
      <ChordSettings
        fretsToShow={fretsToShow}
        setFretsToShow={setFretsToShow}
      />
    </div>
  );
};

export default Tuner;
