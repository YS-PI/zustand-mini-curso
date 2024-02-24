import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Action {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonState & Action> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value) => set((state) => ({ firstName: value })),
  setLastName: (value) => set((state) => ({ lastName: value })),
});

export const usePersonStore = create<PersonState & Action>()(
  persist(storeAPI, {
    name: "person-storage",
    storage: firebaseStorage,
  })
);
