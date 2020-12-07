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
  const { Component, ctx } = AppContext;
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
  green: "#60CFBF",
  red: "#CF6060",
  yellow: "#CFBD60",
  white: "#FFF",
  orange: "#E86900",
};

const GlobalStyle = createGlobalStyle`
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

  @font-face {
	  font-family: 'Rosalinda';
	  src: url('fonts/Rosalinda.eot');
	  src: local('☺'), url('fonts/Rosalinda.woff') format('woff'), url('fonts/Rosalinda.ttf') format('truetype'), url('fonts/Rosalinda.svg') format('svg');
	  font-weight: normal;
	  font-style: normal;
  }

  @font-face {
	  font-family: 'Raleway';
	  src: url('fonts/Raleway-Light.eot');
	  src: local('☺'), url('fonts/Raleway-Light.woff') format('woff'), url('fonts/Raleway-Light.ttf') format('truetype'), url('fonts/Raleway-Light.svg') format('svg');
	  font-weight: normal;
	  font-style: normal;
  }

  @font-face {
  	font-family: 'Raleway';
  	src: url('fonts/Raleway-Bold.eot');
  	src: local('☺'), url('fonts/Raleway-Bold.woff') format('woff'), url('fonts/Raleway-Bold.ttf') format('truetype'), url('fonts/Raleway-Bold.svg') format('svg');
  	font-weight: 700;
  	font-style: normal;
  }

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
        background-color: #000;
    }
  }
  #nprogress .bar {
    background: #000 !important;
  }

`;
