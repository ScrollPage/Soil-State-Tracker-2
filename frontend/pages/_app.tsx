import Head from "next/head";
import nprogress from "nprogress/nprogress.css";
import { SWRConfig } from "swr";
import Router from "next/router";
import NProgress from "nprogress";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { normalize } from "styled-normalize";
import { createWrapper } from "next-redux-wrapper";
import { Provider } from "react-redux";
import Cookie from "js-cookie";
import store from "@/store/store";
import axios from "axios";
import Alert from "@/components/UI/Alert";
import App, { AppContext, AppProps } from "next/app";
import RootModal from "@/components/Modal";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: nprogress }} />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </Head>
      <>
        <GlobalStyle />
        <SWRConfig
          value={{
            revalidateOnMount: true,
            revalidateOnFocus: true,
            dedupingInterval: 5000,
            fetcher: (url) =>
              axios({
                url: url,
                baseURL: process.env.DB_HOST,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${Cookie.get("token")}`,
                },
              }).then((r) => r.data),
          }}
        >
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <Alert />
              <RootModal />
              <Component {...pageProps} />
            </ThemeProvider>
          </Provider>
        </SWRConfig>
      </>
    </>
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

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    text-decoration: none;
    box-sizing: border-box;
  }
  #__next {
    flex: 1;
    width: 100%;
    position: relative;
    height: 100%;
    width: 100%;
  }
  p {
    margin: 0;
  }
  html {
    height: 100%;
    width: 100%;
  }
  body {
    height: 100%;
    width: 100%;
    overscroll-behavior: none;
    overflow-x: hidden;
    /* overflow-y: scroll; */
    &.no-scroll {
      overflow-y: hidden;
    }
    &::-webkit-scrollbar {
        width: 5px;
        background-color: #f5f5f5;
        @media (max-width: 575.98px) {
            width: 0px;
        }
    }
    &::-webkit-scrollbar-track {
        height: 90%;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #E86900;
    }
  }
  #nprogress .bar {
    background: #E86900 !important;
  }

`;
