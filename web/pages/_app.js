// _app.tsx file
import { GetServerSidePropsContext } from "next";
import React from "react";
import { AppProps } from "next/app";
// install cookies-next package to manage cookies
import { getCookie, setCookies } from "cookies-next";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";

export default function App(props) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = React.useState(props.colorScheme);

  const toggleColorScheme = (value) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    // when color scheme is updated save it to cookie
    setCookies("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

App.getInitialProps = ({ ctx }) => ({
  // get color scheme from cookie
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
