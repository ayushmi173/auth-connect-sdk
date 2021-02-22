import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../src/components/shared/layout";
import TextInput from "../src/components/shared/Input";
import styled from "styled-components";
import Form from "../src/components/shared/form";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "../src/redux-store/actions/actionCreator";
import { InitialEntityState, IUser } from "../src/redux-store/types";
import Message from "../src/components/shared/message";
import { withAuth } from "../src/utils/auth";
import { Context } from "../pages/_app";

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const SignUp: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();
  const errorMessage: boolean = useSelector(
    (state: InitialEntityState) => state.error
  );
  const user: IUser = useSelector((state: InitialEntityState) => state.user);
  const login: boolean = useSelector(
    (state: InitialEntityState) => state.entities.login
  );

  useEffect(() => {
    if (!errorMessage) {
      clearFields();
    }
  }, [errorMessage]);
  
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
      type="password"
      placeholder="Enter Password"
      value={password}
      disabled={false}
      key={2}
      onChange={(value) => setPassword(value)}
    />
  );

  const emailInput = (
    <TextInput
      required={true}
      label="Email"
      type="email"
      placeholder="Enter Email"
      value={email}
      disabled={false}
      key={3}
      onChange={(value) => setEmail(value)}
    />
  );

  const clearFields = () => {
    setUsername("");
    setPassword("");
    setEmail("");
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(userSignUp(username, password, email));
  }

  function handleReset(event: React.MouseEvent<HTMLButtonElement>): void {
    clearFields();
  }

  return (
    <>
      <Layout title="Sign Up" />
      <SignUpWrapper>
        <Form
          title="Connect Authentication SDK"
          subtitle="Fill our credentials for signing up..."
          submitLabel="Sign Up"
          key={1}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          {usernameInput}
          {passwordInput}
          {emailInput}
        </Form>
        {errorMessage ? (
          <Message summary="There is something error" />
        ) : (
          <>
            {user.id && !login ? (
              <Message summary="User Successfully Registered" />
            ) : (
              <></>
            )}
          </>
        )}
      </SignUpWrapper>
    </>
  );
};

SignUp.getInitialProps = async (_ctx: Context) => ({});
export default withAuth(false, SignUp);
