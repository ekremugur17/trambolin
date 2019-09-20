import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import discountCode from './discountCode';
import giftCode from './giftCode';


const SecondMenu = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/discountCode`} />
      <Route path={`${match.url}/discountCode`} component={discountCode} />
      <Route path={`${match.url}/giftCode`} component={giftCode} />
      <Redirect to="/error" />
    </Switch>
  </div>
);
export default SecondMenu;
