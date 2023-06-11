import React, { ReactNode } from "react";
import Input from "./Input";

interface FormProps {
  bootstrapClass?: string;
  inputs: {
    bootstrapClass?: string;
    label?: ReactNode;
    input: ReactNode;
    invalidErrorMessage?: string;
  }[];
  action: string;
  method: string;
  validButton: ReactNode;
}

const Form = ({
  bootstrapClass,
  inputs,
  action,
  method,
  validButton,
}: FormProps) => {
  return (
    <form className={bootstrapClass} action={action} method={method}>
      <div className="row g-3">
        {inputs.map((input, index) => {
          return (
            <Input
              key={"form-input-" + index}
              bootstrapClass={input.bootstrapClass}
              label={input.label}
              input={input.input}
              invalidErrorMessage={input.invalidErrorMessage}
            />
          );
        })}

        {validButton}
      </div>
    </form>
  );
};

export default Form;
