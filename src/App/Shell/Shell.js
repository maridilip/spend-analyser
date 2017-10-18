import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Grid } from 'react-bootstrap'

import Routes from "../routes";
import Navigation from '../Components/Navigation'
import TitleBar from './Components/TitleBar'

let basename = window.location.pathname.split('/');
basename.pop();
basename = basename.join('/');

const navigatorData = [{
  path: '/Overview',
  content: 'Overview'
},
// {
//   path: '/Leads',
//   content: 'Leads'
// }, {
//   path: '/Opportunities',
//   content: 'Opportunities'
// }, 
// {
//   path: '/SpendingSummary',
//   content: 'Spending Summary'
// }
// {
//   path: '/CustomerDetails',
//   content: 'Customer Details'
// }
]
const Shell = () => (<Router basename={basename}>
  <div>
    <TitleBar />
    <Navigation navigatorData={navigatorData} />
    <main>
      <Grid>
        <Routes />
      </Grid>
    </main>
  </div>
</Router>)

export default Shell