import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import React from "react";
import { Context } from "../../pages/_app";
import { InitialEntityState } from "../redux-store/types";
import nextCookie from "next-cookies";
import cookie from "js-cookie";

type WithAuthProps = {
  token?: string;
};

let _token: string = "";

export function redirect(
  ctx: NextPageContext | null,
  path: string,
  nextPath: string | null = null
): void {
  if (ctx && ctx.res) {
    ctx.res.writeHead(302, { Location: path }).end();
  } else {
    nextPath ? Router.push(nextPath, path) : Router.push(path);
  }
}

export async function setTokenCookie(token: string): Promise<void> {
  _token = token;
  cookie.set("token", token, {
    expires: 7,
  });
}

export function getToken(): string {
  return _token || cookie.get("token") || "";
}

export async function afterLoginRedirect(
  url: string = "/",
  as?: string
): Promise<void> {
  await Router.push(url, as);
}

export async function removeCookieToken(
  ctx: NextPageContext | null
): Promise<void> {
  cookie.remove("token");
}

export function withAuth<P extends object>(
  expectLoggedIn: boolean,
  WrappedComponent: NextPage<P & WithAuthProps>
): NextPage<P & WithAuthProps> {
  const Wrapper: NextPage<P & WithAuthProps> = (props: P) => {
    return <WrappedComponent {...props} />;
  };
  let getMeFailed = !_token;

  Wrapper.getInitialProps = async (
    ctx: Context
  ): Promise<P & WithAuthProps> => {
    const { token } = nextCookie(ctx);
    _token = token ? token : "";

    let state = ctx.store.getState() as InitialEntityState;
    if (expectLoggedIn && _token === "" && !state.user.id) {
      redirect(ctx, "/signin");
    }

    // TODO cancel if redirecting
    const componentProps = await WrappedComponent.getInitialProps!(ctx);
    return { ...componentProps, token: _token };
  };
  return Wrapper;
}
