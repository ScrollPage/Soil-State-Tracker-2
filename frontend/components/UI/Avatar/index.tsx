import Image from "next/image";
import React, { memo } from "react";
import { Wrapper } from "./styles";

interface Props {
  size?: number;
}

const AvatarContainer: React.FC<Props> = ({ size = 56 }) => {
  return (
    <Wrapper>
      <Image src="/avatar.svg" width={size} height={size} />
    </Wrapper>
  );
};

export const Avatar = memo(AvatarContainer);
