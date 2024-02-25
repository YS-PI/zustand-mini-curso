import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Action {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPI: StateCreator<
  PersonState & Action,
  [["zustand/devtools", never]]
> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value) => set({ firstName: value }, false, "setFirstName"),
  setLastName: (value) => set({ lastName: value }, false, "setLastName"),
});

export const usePersonStore = create<PersonState & Action>()(
  devtools(
    persist(storeAPI, {
      name: "person-storage",
      storage: firebaseStorage,
    })
  )
);
