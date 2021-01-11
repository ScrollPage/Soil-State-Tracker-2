import Head from "next/head";
import nprogress from "nprogress/nprogress.css";
import Router from "next/router";
import NProgress from "nprogress";
import { ThemeProvider } from "styled-components";
import { createWrapper } from "next-redux-wrapper";
import { Provider } from "react-redux";
import store from "@/store/store";
import App, { AppContext, AppProps } from "next/app";
import { Alert } from "@/components/UI/Alert";
import { RootModal } from "@/components/Modal";
import { GlobalStyle } from "@/someData/globalStyles";
import { SWRProvider } from "@/utils.ts/test-swr";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <style dangerouslySetInnerHTML={{ __html: nprogress }} />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </Head>
      <GlobalStyle />
      <SWRProvider>
        <Provider store={store}>
          <Alert />
          <RootModal />
          <Component {...pageProps} />
        </Provider>
      </SWRProvider>
    </ThemeProvider>
  );
};

MyApp.getInitialProps = async (AppContext: AppContext) => {
  const { Component } = AppContext;
  const appProps = Component.getInitialProps
    ? await App.getInitialProps(AppContext)
    : {};

  return {
    ...appProps,
  };
};

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);

const theme = {
  blue: "#2F3F53",
  lightBlue: "#F5F9FF",
  green: "#60CFBF",
  red: "#CF6060",
  yellow: "#CFBD60",
  white: "#FFF",
  orange: "#E86900",
  blueBgc: "#E5E5E5",
};
