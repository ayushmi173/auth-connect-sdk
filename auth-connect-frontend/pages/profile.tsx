import Head from "next/head";
import React from "react";
import Layout from "../src/components/shared/layout";
import { UserProfile } from "../src/components/user-profile";

const Profile = () => {
  return (
    <>
      <Head>
        <title>Connect Authentication SDK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title={"profile"} />
      <UserProfile />
    </>
  );
};

export default Profile;
