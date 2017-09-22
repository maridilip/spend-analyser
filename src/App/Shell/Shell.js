import React from 'react'

import Routes from "../routes";
import Card from '../Components/Card'
export default () => (<div>
  <aside>
    <Card>This is left menu</Card>
  </aside>
  <main>
    This is spend analyser
    <Routes />
  </main>
</div>)