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
import { GlobalStyle, globalTheme } from "@/utils/globalStyles";
import { SWRProvider } from "@/utils/test-swr";
import { ConfigProvider } from "antd";
import antd from "antd/dist/antd.min.css";
import ruRU from "antd/lib/locale/ru_RU";

// set nprogress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <style dangerouslySetInnerHTML={{ __html: antd }} />
        <style dangerouslySetInnerHTML={{ __html: nprogress }} />
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </Head>
      <GlobalStyle />
      <ConfigProvider locale={ruRU}>
        <SWRProvider>
          <Provider store={store}>
            <Alert />
            <RootModal />
            <Component {...pageProps} />
          </Provider>
        </SWRProvider>
      </ConfigProvider>
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
