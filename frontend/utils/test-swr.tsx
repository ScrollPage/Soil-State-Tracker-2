import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { SWRConfig } from "swr";
import axios from "axios";
import Cookie from "js-cookie";

export const SWRProvider: React.ComponentType<{
  children: React.ReactElement;
}> = ({ children }) => {
  return (
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
      {children}
    </SWRConfig>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: SWRProvider as React.ComponentType, ...options });

export * from "@testing-library/react";

export { customRender as render };
