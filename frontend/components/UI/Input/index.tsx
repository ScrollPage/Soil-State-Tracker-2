import { useField } from "formik";
import React from "react";
import { InputHTMLAttributes } from "react";
import { SInput, SInputTag, SInputError } from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  width?: string;
};

const Input: React.FC<InputProps> = (props) => {
  const [field, meta] = useField(props);
  const isShowError = meta.touched && !!meta.error;
  return (
    <SInput>
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
