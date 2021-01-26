import { useField } from "formik";
import Image from "next/image";
import React, { memo } from "react";
import { InputHTMLAttributes } from "react";
import { Wrapper, Inner, Error, Icon } from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  width?: string;
  src?: string;
  myType?: "default";
};

const InputComponent: React.FC<InputProps> = (props) => {
  const [field, meta] = useField(props);
  const isShowError = meta.touched && !!meta.error;
  return (
    <Wrapper width={props?.width}>
      {props?.src && (
        <Icon>
          <Image height={20} width={20} src={`/input/${props.src}.svg`} />
        </Icon>
      )}
      <Inner
        myType={props?.myType}
        {...field}
        {...props}
        isShowError={isShowError}
      />
      {isShowError && <Error data-testid="error">{meta.error}</Error>}
    </Wrapper>
  );
};

export const Input = memo(InputComponent);
