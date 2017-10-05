import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Opportunities from './Journey/Opportunities'
import SpendingSummary from './Journey/SpendingSummary'
import Leads from './Journey/Leads'

const Routes = () => (<Switch>
  <Route exact path="/SpendingSummary" component={SpendingSummary} />
  <Route path="/Leads" component={Leads} />
  <Route path="/Opportunities" component={Opportunities} />
  <Redirect from="/" to="SpendingSummary" />
</Switch>)

export default Routes