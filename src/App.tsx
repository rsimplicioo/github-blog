import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme/defaultTheme";
import { GlobalStyles } from "./styles/global";
import { PostsProvider } from "./contexts/PostsContext";

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <PostsProvider>
          <Router />
        </PostsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
