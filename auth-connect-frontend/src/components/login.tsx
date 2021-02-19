import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Form from "./shared/form";
import TextInput from "./shared/Input";
import { InitialEntityState } from "../redux-store/types";
import { userSignIn } from "../redux-store/actions/action-creator";
import Message from "./shared/message";

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

type Props = {};

export const LogIn: React.FC<Props> = (props: Props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const ErrorMessage = useSelector((state: InitialEntityState) => state.error);
  const accessToken = useSelector(
    (state: InitialEntityState) => state.entities.accessToken
  );

  const usernameInput = (
    <TextInput
      required={true}
      label={"Username"}
      type={"text"}
      placeholder={"Enter Username"}
      value={username}
      disabled={false}
      key={1}
      onChange={(value) => setUsername(value)}
    />
  );

  const passwordInput = (
    <TextInput
      required={true}
      label={"Password"}
      type={"text"}
      placeholder={"Enter Password"}
      value={password}
      disabled={false}
      key={2}
      onChange={(value) => setPassword(value)}
    />
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(userSignIn(username, password));
  }
  function handleReset(event: React.MouseEvent<HTMLButtonElement>): void {
    setUsername("");
    setPassword("");
  }

  return (
    <>
      <SignInWrapper>
        <Form
          title={"Connect Authentication SDK"}
          subtitle={"Fill your existing Username & Password..."}
          submitLabel={"Sign In"}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          {usernameInput}
          {passwordInput}
        </Form>
        {ErrorMessage ? (
          <Message summary={"There is something error"} />
        ) : (
          <>
            {accessToken ? (
              <Message summary={"Successfully Logged In.. Look Your Profile"} />
            ) : (
              <></>
            )}
          </>
        )}
      </SignInWrapper>
    </>
  );
};
