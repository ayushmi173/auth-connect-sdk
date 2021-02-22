import { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../src/components/shared/layout";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Form from "../src/components/shared/form";
import TextInput from "../src/components/shared/Input";
import { InitialEntityState } from "../src/redux-store/types";
import { userSignIn } from "../src/redux-store/actions/actionCreator";
import Message from "../src/components/shared/message";
import { useRouter } from "next/dist/client/router";

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const SignIn: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();
  const errorMessage: boolean = useSelector(
    (state: InitialEntityState) => state.error
  );
  const login: boolean = useSelector(
    (state: InitialEntityState) => state.entities.login
  );

  const usernameInput = (
    <TextInput
      required={true}
      label="Username"
      type="text"
      placeholder="Enter Username"
      value={username}
      disabled={false}
      key={1}
      onChange={(value) => setUsername(value)}
    />
  );

  const passwordInput = (
    <TextInput
      required={true}
      label="Password"
      type="text"
      placeholder="Enter Password"
      value={password}
      disabled={false}
      key={2}
      onChange={(value) => setPassword(value)}
    />
  );
  if (login) {
    router.push("profile");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(userSignIn(username, password));
  }
  function handleReset(event: React.MouseEvent): void {
    setUsername("");
    setPassword("");
  }

  return (
    <>
      <Layout title="Sign In" />
      <SignInWrapper>
        <Form
          title="Connect Authentication SDK"
          subtitle="Fill your existing Username & Password..."
          submitLabel="Sign In"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          {usernameInput}
          {passwordInput}
        </Form>
        {errorMessage ? <Message summary="There is something error" /> : <></>}
      </SignInWrapper>
    </>
  );
};

export default SignIn;
