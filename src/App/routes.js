import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Opportunities from './Journey/Opportunities'
import SpendingSummary from './Journey/SpendingSummary'
import TransactionSummary from './Journey/TransactionSummary'

const Routes = () => (<Router>
  <div>
    <Switch>
      <Route path="/SpendingSummary" component={SpendingSummary} />
      <Redirect from="/" to="SpendingSummary" />
      <Route path="/TransactionSummary" component={TransactionSummary} />
      <Route path="/Opportunities" component={Opportunities} />
    </Switch>
  </div>
</Router>)

export default Routes