import { NextPage } from "next";
import React, { useEffect } from "react";
import Layout from "../src/components/shared/layout";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Form from "../src/components/shared/form";
import TextInput from "../src/components/shared/Input";
import { InitialEntityState, IUser } from "../src/redux-store/types";
import { Button } from "../src/components/shared/button";
import { afterLoginRedirect, redirect, withAuth } from "../src/utils/auth";
import { Context } from "../pages/_app";

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const Profile: NextPage = () => {
  const dispatch = useDispatch();
  const logOut: boolean = useSelector(
    (state: InitialEntityState) => state.entities.logout
  );
  const user: IUser = useSelector((state: InitialEntityState) => state.user);

  useEffect(() => {
    if (logOut) {
      afterLoginRedirect();
    }
  }, [logOut]);

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
        <Form title="Your Profile" subtitle="Get your account information...">
          {userIdInput}
          {usernameInput}
          {passwordInput}
          {emailInput}
          <Button title="Logout" onClick={setLogout}></Button>
        </Form>
      </ProfileWrapper>
    </>
  );
};

Profile.getInitialProps = async (ctx: Context) => {
  const state = ctx.store.getState();

  if (!state.error && !state.entities.login) {
    redirect(ctx, "/signin");
  }
  return {};
};
export default withAuth(true, Profile);
