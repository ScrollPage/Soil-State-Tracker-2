import Layout from "@/components/Layout/Layout";
import Head from "next/head";
import stylesheet from "antd/dist/antd.min.css";
import nprogress from "nprogress/nprogress.css";
import { SWRConfig } from "swr";
import Router from "next/router";
import NProgress from "nprogress";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { createWrapper } from "next-redux-wrapper";
import { Provider } from "react-redux";
import Cookie from "js-cookie";
import store from "@/store/store";
import axios from "axios";
import Alert from "@/components/UI/Alert";
import App, { AppContext, AppProps } from "next/app";
import cookies from "next-cookies";
import RootModal from "@/components/Modal";
import { IProtection } from "@/types/protection";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

interface IMyApp extends AppProps {
  protection: IProtection;
}

const MyApp = ({ Component, pageProps, protection }: IMyApp) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <style dangerouslySetInnerHTML={{ __html: nprogress }} />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <>
        <GlobalStyle />
        <SWRConfig
          value={{
            revalidateOnMount: true,
            revalidateOnFocus: false,
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
            <Alert />
            <RootModal />
            <Layout protection={protection}>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </SWRConfig>
      </>
    </>
  );
};

MyApp.getInitialProps = async (AppContext: AppContext) => {
  const { Component, ctx } = AppContext;
  const appProps = Component.getInitialProps
    ? await App.getInitialProps(AppContext)
    : {};
  const isAuth = cookies(ctx)?.token ? true : false;
  const isStaff = cookies(ctx)?.isStaff === "true" ? true : false;
  const isWorker = cookies(ctx)?.isWorker === "true" ? true : false;

  const protection: IProtection = {
    isAuth,
    isStaff,
    isWorker,
  };

  return {
    ...appProps,
    protection,
  };
};

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    text-decoration: none;
  }
  #__next {
    height: 100% !important;
    width: 100%;
    position: relative;
  }
  p {
    margin: 0;
  }
  html {
    box-sizing: border-box;
  }
  body {
    height: 100% !important; 
    width: 100%;
    overscroll-behavior: none;
    overflow-x: hidden;
    overflow-y: scroll;
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
        background-color: #000;
    }
  }
  #nprogress .bar {
    background: #000 !important;
  }
`;
