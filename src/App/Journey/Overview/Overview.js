import React from 'react'
import { Image } from 'react-bootstrap'

import Leads from '../Leads'
import myDayImage from './westpac-my-day-section.png'

export default () => (<div>
    <Image src={myDayImage} alt="my-day" responsive />
    <Leads />
</div>)