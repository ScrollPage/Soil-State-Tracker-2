import Image from "next/image";
import React, { memo } from "react";
import { Wrapper } from "./styles";

const AvatarContainer = () => {
  return (
    <Wrapper>
      <Image src="/avatar.svg" width={56} height={56} />
    </Wrapper>
  );
};

export const Avatar = memo(AvatarContainer);
