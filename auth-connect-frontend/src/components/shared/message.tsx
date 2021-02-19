import React from "react";
import styled from "styled-components";
import { COLORS } from "../../colors/constants";

type Props = {
  summary: string;
};

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
  color: ${COLORS.ERROR};
`;
const Message: React.FC<Props> = (props: Props) => {
  return (
    <>
      <MessageContainer>{props.summary}</MessageContainer>
    </>
  );
};

export default Message;
