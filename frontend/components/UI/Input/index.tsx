import { useField } from "formik";
import Image from "next/image";
import React from "react";
import { InputHTMLAttributes } from "react";
import { SInput, SInputTag, SInputError, SInputImg } from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  width?: string;
  src: string;
};

const Input: React.FC<InputProps> = (props) => {
  const [field, meta] = useField(props);
  const isShowError = meta.touched && !!meta.error;
  return (
    <SInput>
      <SInputImg>
        <Image height={20} width={20} src={`/input/${props.src}.svg`} />
      </SInputImg>
      <SInputTag
        {...field}
        {...props}
        isShowError={isShowError}
        width={props?.width}
      />
      {isShowError && <SInputError>{meta.error}</SInputError>}
    </SInput>
  );
};

export default Input;
