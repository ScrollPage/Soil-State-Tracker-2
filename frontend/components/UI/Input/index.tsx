import { useField } from "formik";
import Image from "next/image";
import React, { useMemo } from "react";
import { InputHTMLAttributes } from "react";
import { Wrapper, Inner, Error, Icon } from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  width?: string;
  src?: string;
  myType?: "default";
};

export const Input: React.FC<InputProps> = ({ name, src, width, ...props }) => {
  const [field, meta] = useField(name);
  const isShowError = useMemo(() => meta.touched && !!meta.error, [meta]);
  return (
    <Wrapper width={width}>
      {src && (
        <Icon>
          <Image height={20} width={20} src={`/input/${src}.svg`} />
        </Icon>
      )}
      <Inner {...field} {...props} isShowError={isShowError} />
      {isShowError && <Error data-testid="error">{meta.error}</Error>}
    </Wrapper>
  );
};
