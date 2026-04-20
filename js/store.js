import { createContext, useContext } from 'react';

export const StoreCtx = createContext(null);

export function useStore() {
  return useContext(StoreCtx);
}
