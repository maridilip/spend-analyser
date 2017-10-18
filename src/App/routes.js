import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Overview from './Journey/Overview'
import CustomerDetails from './Journey/CustomerDetails'
// import Leads from './Journey/Leads'
// import Opportunities from './Journey/Opportunities'
// import SpendingSummary from './Journey/SpendingSummary'

const NoMatch = () => <Redirect to="/Overview" />
const Routes = () => {
  return <div>
    <Route exact path={"/Overview"} component={Overview} />
    {/* <Route path={"/Leads"} component={Leads} />
    <Route path={"/Opportunities"} component={Opportunities} />
    <Route path={"/SpendingSummary"} component={SpendingSummary} /> */}
    <Route path={"/CustomerDetails"} component={CustomerDetails} /> 
    <Route component={NoMatch} />
  </div>
}
export default Routes