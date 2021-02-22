import { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../src/components/shared/layout";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Form from "../src/components/shared/form";
import TextInput from "../src/components/shared/Input";
import { InitialEntityState, IUser } from "../src/redux-store/types";
import { COLORS } from "../src/colors/constants";
import { Button } from "../src/components/shared/button";

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

const Profile: NextPage = () => {
  const dispatch = useDispatch();
  const login: boolean = useSelector(
    (state: InitialEntityState) => state.entities.login
  );
  const user: IUser = useSelector((state: InitialEntityState) => state.user);

  const userIdInput = (
    <TextInput
      required={true}
      label="Id"
      type="text"
      value={user.id}
      disabled={true}
      key={0}
    />
  );

  const usernameInput = (
    <TextInput
      required={true}
      label="Username"
      type="text"
      value={user.username}
      disabled={true}
      key={1}
    />
  );

  const passwordInput = (
    <TextInput
      required={true}
      label="Password"
      type="text"
      value={user.password}
      disabled={true}
      key={2}
    />
  );
  const emailInput = (
    <TextInput
      required={true}
      label="Password"
      type="text"
      value={user.email}
      disabled={true}
      key={3}
    />
  );

  const setLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch({ type: "LOGOUT_USER" });
  };

  return (
    <>
      <Layout title="Profile" />
      <ProfileWrapper>
        {login ? (
          <Form title="Your Profile" subtitle="Get your account information...">
            {userIdInput}
            {usernameInput}
            {passwordInput}
            {emailInput}
            <Button title="Logout" onClick={setLogout}></Button>
          </Form>
        ) : (
          <MessageWrapper>You haven't logged In!!</MessageWrapper>
        )}
      </ProfileWrapper>
    </>
  );
};

export default Profile;
