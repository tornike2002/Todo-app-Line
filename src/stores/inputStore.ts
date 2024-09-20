import { create } from "zustand";
interface InputStoreState {
  inputValue: string;
  setInputValue: (value: string) => void;
}
export const useInputStore = create<InputStoreState>((set) => {
  return {
    inputValue: "",
    setInputValue: (value: string) => set({ inputValue: value }),
  };
});
