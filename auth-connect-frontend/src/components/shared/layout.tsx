import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { COLORS } from "../../colors/constants";

type Props = {
  title?: string;
};

const LayoutWrapper = styled.div`
  margin: 20px 0px;
  padding: 20px 0px;
  background-color: ${COLORS.BLACK};
`;

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;

const LinkAnchorWrapper = styled.a`
  text-decoration: none;
  font-size: 22px;
  font-weight: 600;
  color: ${COLORS.WHITE};
  cursor: pointer;
  &:hover {
    color: ${COLORS.GREY};
  }
`;

const Layout: React.FC<Props> = ({ title }: Props) => {
  return (
    <LayoutWrapper>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <NavWrapper>
        <Link href="/">
          <LinkAnchorWrapper>Home</LinkAnchorWrapper>
        </Link>

        <Link href="/signup">
          <LinkAnchorWrapper>Sign Up</LinkAnchorWrapper>
        </Link>

        <Link href="/signin">
          <LinkAnchorWrapper>Sign In</LinkAnchorWrapper>
        </Link>
      </NavWrapper>
    </LayoutWrapper>
  );
};
export default Layout;
