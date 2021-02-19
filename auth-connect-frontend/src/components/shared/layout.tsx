import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { COLORS } from "../../colors/constants";

type LayoutProps = {
  title?: string;
};

const LayoutWrapper = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid ${COLORS.GREY};
`;

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;

const HeadWrapper = styled(Head)``;
const Layout: React.FunctionComponent<LayoutProps> = ({ children, title }) => (
  <LayoutWrapper>
    <HeadWrapper>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </HeadWrapper>
    <header>
      <NavWrapper>
        <Link href="/">
          <a>Home</a>
        </Link>

        <Link href="/signup">
          <a>Sign Up</a>
        </Link>

        <Link href="/signin">
          <a>Sign In</a>
        </Link>

        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </NavWrapper>
    </header>
    {children}
  </LayoutWrapper>
);
export default Layout;
