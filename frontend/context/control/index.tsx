import React, { useCallback, useMemo, useState, useContext } from "react";
import { createContext } from "react";

type KindType = "detector" | "cluster";

interface ChooseContextData {
  id: number | null;
  kind: KindType | null;
  title: string | null;
  name: string | null;
  choose: (
    id: number,
    kind: KindType,
    title: string | null,
    name: string | null
  ) => void;
}

const ChooseContext = createContext<ChooseContextData | undefined>(undefined);

export const useChooseContext = () => {
  const chooseContext = useContext(ChooseContext);
  if (!chooseContext) {
    throw new Error(
      "useChooseContext must be used within the ChooseContext.Provider"
    );
  }
  return chooseContext;
};

const useChooseContextValue = () => {
  const [id, setId] = useState<number | null>(null);
  const [kind, setKind] = useState<KindType | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const choose = useCallback(
    (id: number, kind: KindType, title: string | null, name: string | null) => {
      setId(id);
      setKind(kind);
      setTitle(title);
      setName(name);
    },
    [id, kind, title, name, setId, setKind, setTitle, setName]
  );

  return useMemo(() => ({ id, kind, title, name, choose }), [
    id,
    kind,
    title,
    choose,
    name,
  ]);
};

const ChooseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const chooseContextValue = useChooseContextValue();

  return (
    <ChooseContext.Provider value={chooseContextValue}>
      {children}
    </ChooseContext.Provider>
  );
};

export default ChooseProvider;
