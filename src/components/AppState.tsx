import {
  ChordName,
  ChromaticNote,
  getChromaticNotesInChord,
  Note,
} from "musicTheory";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface AppState {
  rootNote: ChromaticNote;
  currentChord: ChordName;
  notesInCurrentChord: ChromaticNote[];
  showOctave: boolean;
  strings: Note[];
  fretsToShow: number;
  selectedNotes: Note[];
}

export const AppStateContext = createContext<AppState>({
  rootNote: "C",
  currentChord: "major",
  showOctave: false,
  notesInCurrentChord: [],
  strings: [],
  fretsToShow: 5,
  selectedNotes: [],
});

interface AppStateMutations {
  setRootNote: (rootNode: ChromaticNote) => void;
  setCurrentChord: (chord: ChordName) => void;
  setShowOctave: (showOctave: boolean) => void;
  setStrings: (strings: Note[]) => void;
  setFretsToShow: (frets: number) => void;
  setSelectedNotes: (selectedNotes: Note[]) => void;
  addSelectedNote: (selectedNote: Note) => void;
  removeSelectedNote: (selectedNote: Note) => void;
}

export const AppStateMutationsContext = createContext<AppStateMutations>({
  setRootNote: (_) => {},
  setCurrentChord: (_) => {},
  setShowOctave: (_) => {},
  setStrings: (_) => {},
  setFretsToShow: (_) => {},
  setSelectedNotes: (_) => {},
  addSelectedNote: (_) => {},
  removeSelectedNote: (_) => {},
});

interface Props {
  children: ReactNode;
}

const createDefaultStrings = (): Note[] => [
  { name: "E", octave: "3" },
  { name: "A", octave: "3" },
  { name: "D", octave: "4" },
  { name: "G", octave: "4" },
  { name: "B", octave: "4" },
  { name: "E", octave: "5" },
];

export const useAppState = () => useContext(AppStateContext);
export const useAppStateMutations = () => useContext(AppStateMutationsContext);

const AppStateWrapper = ({ children }: Props) => {
  const [rootNote, setRootNote] = useState<ChromaticNote>("C");
  const [currentChord, setCurrentChord] = useState<ChordName>("major");
  const [strings, setStrings] = useState(createDefaultStrings());
  const [fretsToShow, setFretsToShow] = useState(6);
  const [showOctave, setShowOctave] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);

  const notesInCurrentChord = useMemo(
    () => getChromaticNotesInChord(rootNote, currentChord),
    [rootNote, currentChord]
  );

  const addSelectedNote = useCallback(
    (note: Note) => {
      const newValue = [...selectedNotes, note];
      setSelectedNotes(newValue);
    },
    [selectedNotes, setSelectedNotes]
  );

  const removeSelectedNote = useCallback(
    (note: Note) => {
      const newValue = selectedNotes.filter((otherNote) => otherNote !== note);
      setSelectedNotes(newValue);
    },
    [selectedNotes, setSelectedNotes]
  );

  const state = {
    rootNote,
    currentChord,
    notesInCurrentChord,
    showOctave,
    strings,
    fretsToShow,
    selectedNotes,
  };

  const mutations = {
    setRootNote,
    setCurrentChord,
    setShowOctave,
    setStrings,
    setFretsToShow,
    setSelectedNotes,
    addSelectedNote,
    removeSelectedNote,
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
