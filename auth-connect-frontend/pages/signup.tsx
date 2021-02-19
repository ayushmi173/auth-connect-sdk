import React from "react";
import { Register } from "../src/components/register";
import Layout from "../src/components/shared/layout";

const SignUp = () => {
  return (
    <>
      <Layout title={"Sign Up"} />
      <Register />
    </>
  );
};

export default SignUp;
