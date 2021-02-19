import React from "react";
import styled from "styled-components";
import { COLORS } from "../../colors/constants";

type Props = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  submitLabel?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => any;
  onReset?: (event: React.MouseEvent<HTMLButtonElement>) => any;
};

export const FormRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  height: auto;
  padding: 35px;
  border: 3px solid ${COLORS.BLACK};
`;

export const FormTitle = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 30px;
  font-weight: 600;
  line-height: 1.2;
`;

export const FormSubtitle = styled.span`
  font-weight: 700;
  margin-top: 20px;
  display: block;
  font-size: 16px;
  color: ${COLORS.GREY};
  line-height: 20px;
`;

const FormContents = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  > * {
    margin-top: 20px;
  }
`;

const FormSubmit = styled.button`
  text-align: center;
  font-size: 16px;
  width: 110px;
  height: 30px;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.BLACK};
  border-radius: 3px;
`;

const FormButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`;

const Form: React.FC<Props> = (props: Props) => {
  return (
    <FormRoot>
      <FormTitle>{props.title}</FormTitle>
      <FormSubtitle>{props.subtitle}</FormSubtitle>
      <FormContents onSubmit={props.onSubmit}>
        {props.children}

        {props.submitLabel ? (
          <FormButtonWrapper>
            <FormSubmit title={props.submitLabel} type="submit">
              {props.submitLabel}
            </FormSubmit>
            <FormSubmit title="Reset" type="reset" onClick={props.onReset}>
              Reset
            </FormSubmit>
          </FormButtonWrapper>
        ) : (
          <></>
        )}
      </FormContents>
    </FormRoot>
  );
};

export default Form;
