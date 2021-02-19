import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/redux-store/store";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;