import { ChordName, ChromaticNote, Note } from "musicTheory";
import { createContext, ReactNode, useState } from "react";

interface AppState {
  rootNote: ChromaticNote;
  currentChord: ChordName;
  showOctave: boolean;
  strings: Note[];
  fretsToShow: number;
}

export const AppStateContext = createContext<AppState>({
  rootNote: "C",
  currentChord: "major",
  showOctave: false,
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

const AppStateWrapper = ({ children }: Props) => {
  const [rootNote, setRootNote] = useState<ChromaticNote>("C");
  const [currentChord, setCurrentChord] = useState<ChordName>("major");
  const [strings, setStrings] = useState(createDefaultStrings());
  const [fretsToShow, setFretsToShow] = useState(6);
  const [showOctave, setShowOctave] = useState(false);

  const state = {
    rootNote,
    currentChord,
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
