import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import AppLocale from "./lang";
import ColorSwitcher from "./components/common/ColorSwitcher";
import NotificationContainer from "./components/common/react-notifications/NotificationContainer";
import { isMultiColorActive } from "./constants/defaultValues";
import app from "./views/app";
import user from "./views/user";
import error from "./views/error";
import landing from "./views/landing";
import complete from "./views/complete";
import verify from "./views/verify";
import { getDirection } from "./helpers/Utils";
import { loadUser } from "./redux/auth/actions";
import SetAuthToken from "./helpers/SetAuthToken";
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  componentDidMount() {
    if (localStorage.token) SetAuthToken(localStorage.token);
    this.props.loadUser();
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }


  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Router>
              <Fragment>
                <Switch>
                  <PrivateRoute path="/app" component={app} />
                  <Route path="/user" component={user} />
                  <Route path="/error" exact component={error} />
                  <Route path="/" exact component={landing} />
                  <PrivateRoute path="/complete" exact component={complete} />
                  <Route path="/:token" component={verify} />
                  <Redirect to="/error" />
                </Switch>
              </Fragment>
            </Router>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = { loadUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
