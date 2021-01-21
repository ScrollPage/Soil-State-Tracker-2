import React, { useCallback, useMemo, useState, useContext } from "react";
import { createContext } from "react";

type KindType = "detector" | "cluster";

interface ChooseContextData {
  id: number | null;
  kind: KindType | null;
  choose: (id: number, kind: KindType) => void;
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

  const choose = useCallback(
    (id: number, kind: KindType) => {
      setId(id);
      setKind(kind);
    },
    [id, kind, setId, setKind]
  );

  return useMemo(() => ({ id, kind, choose }), [id, kind, choose]);
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
