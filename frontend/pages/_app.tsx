import Layout from "@/components/Layout/Layout";
import Head from "next/head";
import stylesheet from "antd/dist/antd.min.css";
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
              <Layout protection={protection}>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
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

  const protection: IProtection = {
    isAuth,
    isStaff,
  };

  return {
    ...appProps,
    protection,
  };
};

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);

const theme = {
  blue: "#2F3F53",
  green: "#60CFBF",
  red: "#CF6060",
  yellow: "#CFBD60",
  white: "#FFF",
};

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

  @font-face {
	  font-family: 'Play';
	  src: url('fonts/Play-Regular.eot');
	  src: local('☺'), url('fonts/Play-Regular.woff') format('woff'), url('fonts/Play-Regular.ttf') format('truetype'), url('fonts/Play-Regular.svg') format('svg');
	  font-weight: normal;
	  font-style: normal;
  }

  @font-face {
	  font-family: 'Play';
	  src: url('fonts/Play-Bold.eot');
	  src: local('☺'), url('fonts/Play-Bold.woff') format('woff'), url('fonts/Play-Bold.ttf') format('truetype'), url('fonts/Play-Bold.svg') format('svg');
	  font-weight: 700;
	  font-style: normal;
  }

  @font-face {
  	font-family: 'Montserrat';
  	src: url('fonts/Montserrat-Regular.eot');
  	src: local('☺'), url('fonts/Montserrat-Regular.woff') format('woff'), url('fonts/Montserrat-Regular.ttf') format('truetype'), url('fonts/Montserrat-Regular.svg') format('svg');
  	font-weight: normal;
  	font-style: normal;
  }

  @font-face {
	  font-family: 'Montserrat';
	  src: url('fonts/Montserrat-Bold.eot');
	  src: local('☺'), url('fonts/Montserrat-Bold.woff') format('woff'), url('fonts/Montserrat-Bold.ttf') format('truetype'), url('fonts/Montserrat-Bold.svg') format('svg');
	  font-weight: 700;
	  font-style: normal;
  }

`;
