import Link from "next/link";
import React, { memo } from "react";
import { SControlClusterTooltip } from "./styles";

interface IControlClusterTooltip {
  id: number;
  name: string;
}

const ControlClusterTooltip: React.FC<IControlClusterTooltip> = ({
  id,
  name,
}) => {
  return (
    <SControlClusterTooltip>
      {id === 0 ? (
        name
      ) : (
        <Link href={`/control/${id}`}>
          <a>{name}</a>
        </Link>
      )}
    </SControlClusterTooltip>
  );
};

export default memo(ControlClusterTooltip);
