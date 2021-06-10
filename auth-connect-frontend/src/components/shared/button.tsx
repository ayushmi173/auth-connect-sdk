import React from "react";
import styled from "styled-components";
import { COLORS } from "../../colors/constants";

type Props = {
  title: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
};

const ButtonWrapper = styled.button`
  text-align: center;
  font-size: 16px;
  width: 110px;
  height: 30px;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.BLACK};
  border-radius: 3px;
`;
export const Button: React.FC<Props> = (props: Props) => {
  return (
    <>
      <ButtonWrapper onClick={props.onClick}>{props.title}</ButtonWrapper>
    </>
  );
};
