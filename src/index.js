import React from "react";
import 'styles/global.scss'
import * as ReactRedux from 'react-redux'
import ReactDOM from "react-dom";
import App from './pages/Screens/Home'
import { I18nextProvider } from "react-i18next";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import i18Config from "helpers/Translations/i18";
import ConfigStore from "helpers/ReduxConfig";
import AuthenRoutes from "routes/AuthenRoutes";
import CheckAuthen from "helpers/GetToken";
import GlobalLoading from "pages/Components/GlobalLoading";
import theme from "helpers/ThemeCustom";
import 'antd/dist/antd.css';

const store = ConfigStore();

ReactDOM.render(
  <I18nextProvider i18n={i18Config}>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            style={{ fontSize: 25 }}
            maxSnack={1}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            autoHideDuration={5000}
          >
            <GlobalLoading />
            <Switch>
              {AuthenRoutes.map((prop, key) => (
                <Route
                  path={prop.path}
                  exact={prop.exact}
                  component={prop.main}
                  key={key}
                />
              ))}

              <Route
                path="/"
                render={() =>
                  CheckAuthen() ? <App /> : <Redirect to="/signin" />
                }
              />
            </Switch>
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </I18nextProvider>,
  document.getElementById("root")
);
