import Link from "next/link";
import React, { memo } from "react";
import { Tooltip } from "./styles";

interface ControlClusterTooltipProps {
  id: number;
  name: string;
}

const ControlClusterTooltip: React.FC<ControlClusterTooltipProps> = ({
  id,
  name,
}) => {
  return (
    <Tooltip>
      {id === 0 ? null : (
        <Link href={`/control/${id}`}>
          <a>{name}</a>
        </Link>
      )}
    </Tooltip>
  );
};

export default memo(ControlClusterTooltip);
