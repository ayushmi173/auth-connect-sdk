import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import React from "react";
import { Context } from "../../pages/_app";
import { InitialEntityState } from "../redux-store/types";

type WithAuthProps = {
  token?: boolean;
};

let _token = false;

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

export function setAccessTokenStatus(tokenStatus: boolean) {
  _token = tokenStatus;
}

export async function afterLoginRedirect(
  url: string = "/",
  as?: string
): Promise<void> {
  await Router.push(url, as);
}

export function withAuth<P extends object>(
  expectLoggedIn: boolean,
  WrappedComponent: NextPage<P & WithAuthProps>
): NextPage<P & WithAuthProps> {
  const Wrapper: NextPage<P & WithAuthProps> = (props: P) => {
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (
    ctx: Context
  ): Promise<P & WithAuthProps> => {
    let state = ctx.store.getState() as InitialEntityState;

    // TODO cancel if redirecting
    const componentProps = await WrappedComponent.getInitialProps!(ctx);
    return { ...componentProps, token: _token };
  };
  return Wrapper;
}
