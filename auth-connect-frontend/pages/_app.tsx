import { NextPageContext } from "next";
import App, { AppContext, AppInitialProps } from "next/app";
import { NextRouter, withRouter } from "next/router";
import { Store } from "redux";
import { InitialEntityState } from "../src/redux-store/types";
import { makeStore, wrapper } from "../src/redux-store/store";
import withRedux from "next-redux-wrapper";

export type Props = AppInitialProps & {
  store: Store<InitialEntityState>;
  router: NextRouter;
};
export interface Context extends NextPageContext {
  store: Store<InitialEntityState>;
}
class MyApp extends App<Props> {
  static async getInitialProps({
    Component,
    ctx,
  }: AppContext): Promise<AppInitialProps> {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    };
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);
