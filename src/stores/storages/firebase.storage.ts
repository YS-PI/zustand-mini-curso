import { StateStorage, createJSONStorage } from "zustand/middleware";

const url = "https://zustand-storage-d8233-default-rtdb.firebaseio.com/zustand";

const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${url}/${name}.json`).then((res) => res.json());
      console.log(data);
      return JSON.stringify(data);
    } catch (error) {
      throw error;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${url}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());
    console.log(data);
    return data;
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log("removeItem", name);
  },
};
export const firebaseStorage = createJSONStorage(() => storageApi);
