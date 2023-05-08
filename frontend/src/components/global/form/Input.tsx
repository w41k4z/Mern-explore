import React, { ReactNode } from "react";

interface InputProps {
  bootstrapClass?: string;
  label?: ReactNode;
  input: ReactNode;
  invalidErrorMessage?: string;
}

const Input = ({
  bootstrapClass,
  label,
  input,
  invalidErrorMessage,
}: InputProps) => {
  return (
    <div className={bootstrapClass}>
      {label}
      {input}
      {invalidErrorMessage && (
        <div className="invalid-feedback">{invalidErrorMessage}</div>
      )}
    </div>
  );
};

export default Input;
