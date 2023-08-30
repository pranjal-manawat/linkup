import { SessionProvider } from "next-auth/react";
import { ThemeContextProvider } from "../context/themeContext";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeContextProvider>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </SessionProvider>
  );
};

export default MyApp;
