import Link from "next/link";
import React, { memo } from "react";
import { Wrapper } from "./styles";

interface ipProps {
  id: number;
  name: string;
}

const Tooltip: React.FC<ipProps> = ({ id, name }) => {
  return (
    <Wrapper>
      {id === 0 ? null : (
        <Link href={`/control/${id}`}>
          <a>{name}</a>
        </Link>
      )}
    </Wrapper>
  );
};

export default memo(Tooltip);
