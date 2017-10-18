import React from 'react'
import {Button } from 'react-bootstrap'

export default ({ minDate, maxDate, onClick }) => (<div>
    <div>
        <h3> Spending by category
            <sub>
                <Button bsStyle={"link"} onClick={() => onClick('transactions')}>
                    Show all transactions
                </Button>
            </sub>
        </h3>
    </div>
    <div>{`From ${minDate} to to ${maxDate}`}</div>
</div>)