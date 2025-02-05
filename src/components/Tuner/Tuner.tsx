import { useContext, useMemo, useState } from "react";

import { ChromaticNote, Note } from "musicTheory";
import { ChordName, getChromaticNotesInChord } from "musicTheory";

import { GuitarStrings } from "./GuitarStrings";
import { ChordSettings } from "./ChordSettings";

import styles from "./Tuner.module.scss";

const Tuner = () => {
  return (
    <div className={styles.tuner}>
      <GuitarStrings />
      <ChordSettings />
    </div>
  );
};

export default Tuner;
