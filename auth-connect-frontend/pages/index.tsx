import { NextPage } from "next";
import styled from "styled-components";
import { COLORS } from "../src/colors/constants";
import Layout from "../src/components/shared/layout";

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  color: ${COLORS.BLACK};
  font-size: 30px;
  font-weight: 600;
`;

const Index: NextPage = () => {
  return (
    <>
      <Layout title="Home" />
      <HeadingWrapper>Connect Authentication SDK</HeadingWrapper>
    </>
  );
};

export default Index;
