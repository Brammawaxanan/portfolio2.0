import { createContext, useContext } from "react";

export const ActiveSectionContext = createContext("home");

export function useActiveSectionContext() {
  return useContext(ActiveSectionContext);
}
