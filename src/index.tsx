import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import cssVars from "css-vars-ponyfill";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import "./scss/index.scss";

import App from "./App";

cssVars({
  onlyLegacy: true,
});

const rootElem = document.getElementById("root");
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
