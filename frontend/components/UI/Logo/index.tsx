import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { SLogo } from "./styles";
import Image from "next/image";

const Logo = () => {
  return (
    <SLogo>
      <Image src={"/logo.svg"} height={"60"} width={"60"} />
    </SLogo>
  );
};

export default Logo;
