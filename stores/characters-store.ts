import { create } from "zustand";

// Definimos los tipos
interface SearchStore {
  term?: string;
  status?: string;
  actions: {
    setTerm: (term: string) => void;
    setStatus: (status: string) => void;
  }
}

// Store con Zustand y tipos
export const useCharacterFiltersStore = create<SearchStore>((set) => ({
  term: '',
  status: '',
  actions: {
    setTerm: (term) => set({ term }),
    setStatus: (status) => set({ status }),
  }
}));

// Selectors
export const useTermSearch = () => useCharacterFiltersStore((state) => state.term)
export const useStatusFilter = () => useCharacterFiltersStore((state) => state.status)

// Actions
export const useCharacterFiltersActions = () => useCharacterFiltersStore((state) => state.actions)