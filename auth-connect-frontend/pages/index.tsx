import Head from "next/head";
import styled from "styled-components";
import { COLORS } from "../src/colors/constants";
import Layout from "../src/components/shared/layout";

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  color: ${COLORS.BLACK};
  font-size: 30px;
  font-weight: 600;
`;
const Home = () => {
  return (
    <>
      <Head>
        <title>Connect Authentication SDK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title={"Home"} />

      <HeadingWrapper>Connect Authentication SDK</HeadingWrapper>
    </>
  );
};

export default Home;
