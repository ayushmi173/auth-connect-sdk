import React from "react";
import TextInput from "../../src/components/shared/Input";
import styled from "styled-components";
import Form from "../../src/components/shared/form";
import { useDispatch, useSelector } from "react-redux";
import { InitialEntityState } from "../../src/redux-store/types";
import { COLORS } from "../colors/constants";
import { Button } from "./shared/button";

type Props = {};

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const MessageWrapper = styled.span`
  font-weight: 700;
  font-size: 30px;
  color: ${COLORS.ERROR};
`;

export const UserProfile: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: InitialEntityState) => state.entities.accessToken
  );
  const userCredential = useSelector((state: InitialEntityState) => state.user);

  const userIdInput = (
    <TextInput
      required={true}
      label={"Id"}
      type={"text"}
      value={userCredential.username}
      disabled={true}
      key={0}
    />
  );

  const usernameInput = (
    <TextInput
      required={true}
      label={"Username"}
      type={"text"}
      value={userCredential.username}
      disabled={true}
      key={1}
    />
  );

  const passwordInput = (
    <TextInput
      required={true}
      label={"Password"}
      type={"text"}
      value={userCredential.password}
      disabled={true}
      key={2}
    />
  );
  const emailInput = (
    <TextInput
      required={true}
      label={"Password"}
      type={"text"}
      value={userCredential.email}
      disabled={true}
      key={3}
    />
  );

  const setLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: "LOGOUT_USER" });
  };

  return (
    <>
      <ProfileWrapper>
        {accessToken ? (
          <Form
            title={"Your Profile"}
            subtitle={"Get your account information..."}
          >
            {userIdInput}
            {usernameInput}
            {passwordInput}
            {emailInput}
            <Button title={"Logout"} onClick={setLogout}></Button>
          </Form>
        ) : (
          <MessageWrapper>Go for Login</MessageWrapper>
        )}
      </ProfileWrapper>
    </>
  );
};
