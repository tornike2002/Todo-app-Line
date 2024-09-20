import { create } from "zustand";

export const useInputStore = create((set) => {
  return {
    inputValue: "",
    setInputValue: (value: string) => set({ inputValue: value }),
  };
});
