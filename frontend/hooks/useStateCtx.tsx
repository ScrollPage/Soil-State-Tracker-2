import { ReactNode, useState } from "react";
import { createContext, Dispatch, SetStateAction } from "react";

export function createCtx<A>(defaultValue: A) {
  type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = createContext({ state: defaultValue, update: defaultUpdate });
  function Provider({ children }: { children: ReactNode }) {
    const [state, update] = useState(defaultValue);
    return <ctx.Provider value={{ state, update }}> {children} </ctx.Provider>;
  }
  return [ctx, Provider] as [typeof ctx, typeof Provider];
}
