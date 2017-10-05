import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Grid } from 'react-bootstrap'

import Routes from "../routes";
import Navigation from '../Components/Navigation'
import TitleBar from './Components/TitleBar'

const Shell = () => (<Router>
  <div>
    <TitleBar />
    <Navigation />
    <main>
      <Grid>
      <Routes />
      </Grid>
    </main>
  </div>
</Router>)

export default Shell