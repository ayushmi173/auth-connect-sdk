import React from "react";
import styled from "styled-components";
import { COLORS } from "../../colors/constants";

type Props = {
  placeholder?: string;
  type: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  label: string;
  onChange?: (value: string) => void;
};

const TextInputRoot = styled.label`
  display: flex;
  flex-direction: column;
  border: 3px;
`;

const TextInputLabelContents = styled.span`
  display: block;
  font-weight: 700;
  font-size: 18px;
  color: ${COLORS.BLACK};
  margin-bottom: 10px;
  &::placeholder {
    color: ${COLORS.PLACEHOLDER};
  }
`;

const InputWrapper = styled.input`
  height: 30px;
  width: 700px;
  font-size: 15px;
`;

const TextInput: React.FC<Props> = (props: Props) => {
  const { label, ...inputProps } = props;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    props.onChange(event.target.value);
  }

  return (
    <TextInputRoot>
      <TextInputLabelContents>{label}</TextInputLabelContents>
      <InputWrapper
        type={props.type}
        placeholder={props.placeholder}
        required={props.required}
        value={props.value}
        disabled={props.disabled}
        onChange={handleChange}
      ></InputWrapper>
    </TextInputRoot>
  );
};

export default TextInput;
