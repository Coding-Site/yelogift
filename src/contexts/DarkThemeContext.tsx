import { createContext } from "react";

interface DarkThemeContext {
  dark: boolean | null;
  setUser: () => void;
}

export const DarkThemeContext = createContext<DarkThemeContext>({
  dark: null,
  setUser: () => {},
});