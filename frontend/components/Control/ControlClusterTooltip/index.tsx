import { Tooltip } from "antd";
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
    <Tooltip
      title={`Перейти к мониторингу датчиков группы ${name}`}
      color={"blue"}
    >
      <SControlClusterTooltip>
        <Link href="/control/[ID]" as={`/control/${id}`}>
          <a>{name}</a>
        </Link>
      </SControlClusterTooltip>
    </Tooltip>
  );
};

export default memo(ControlClusterTooltip);
