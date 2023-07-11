import React from "react";
import ReactDOM from "react-dom/client";
import moment from "moment";
import "moment/dist/locale/pt-br";

import { App } from "./App.tsx";

moment.locale("pr-br");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
