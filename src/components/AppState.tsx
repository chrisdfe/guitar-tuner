import {
  ChordName,
  ChromaticNote,
  getChromaticNotesInChord,
  Note,
} from "musicTheory";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface AppState {
  rootNote: ChromaticNote;
  currentChord: ChordName;
  notesInCurrentChord: ChromaticNote[];
  showOctave: boolean;
  strings: Note[];
  fretsToShow: number;
}

export const AppStateContext = createContext<AppState>({
  rootNote: "C",
  currentChord: "major",
  showOctave: false,
  notesInCurrentChord: [],
  strings: [],
  fretsToShow: 5,
});

interface AppStateMutations {
  setRootNote: (rootNode: ChromaticNote) => void;
  setCurrentChord: (chord: ChordName) => void;
  setShowOctave: (showOctave: boolean) => void;
  setStrings: (strings: Note[]) => void;
  setFretsToShow: (frets: number) => void;
}

export const AppStateMutationsContext = createContext<AppStateMutations>({
  setRootNote: (_) => {},
  setCurrentChord: (_) => {},
  setShowOctave: (_) => {},
  setStrings: (_) => {},
  setFretsToShow: (_) => {},
});

interface Props {
  children: ReactNode;
}

const createDefaultStrings = (): Note[] => [
  { name: "E", octave: "4" },
  { name: "A", octave: "4" },
  { name: "D", octave: "5" },
  { name: "G", octave: "5" },
  { name: "B", octave: "5" },
  { name: "E", octave: "6" },
];

export const useAppState = () => useContext(AppStateContext);
export const useAppStateMutations = () => useContext(AppStateMutationsContext);

const AppStateWrapper = ({ children }: Props) => {
  const [rootNote, setRootNote] = useState<ChromaticNote>("C");
  const [currentChord, setCurrentChord] = useState<ChordName>("major");
  const [strings, setStrings] = useState(createDefaultStrings());
  const [fretsToShow, setFretsToShow] = useState(6);
  const [showOctave, setShowOctave] = useState(false);

  const notesInCurrentChord = useMemo(
    () => getChromaticNotesInChord(rootNote, currentChord),
    [rootNote, currentChord]
  );

  const state = {
    rootNote,
    currentChord,
    notesInCurrentChord,
    showOctave,
    strings,
    fretsToShow,
  };

  const mutations = {
    setRootNote,
    setCurrentChord,
    setShowOctave,
    setStrings,
    setFretsToShow,
  };

  return (
    <AppStateContext.Provider value={state}>
      <AppStateMutationsContext.Provider value={mutations}>
        {children}
      </AppStateMutationsContext.Provider>
    </AppStateContext.Provider>
  );
};

export default AppStateWrapper;
