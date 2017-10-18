import React from 'react'
import { Button, FormGroup, FormControl } from 'react-bootstrap'

export default ({ minDate, maxDate, onClick, onSearch }) => (<div>
    <div>
        <h3> Transaction details
            <sub>
                <Button bsStyle={"link"} onClick={() => onClick('category')}>
                    Show by catergory
                </Button>
            </sub>
        </h3>
    </div>
    <FormGroup>
        <FormControl type="text" placeholder="Search your transactions" onChange={(eve) => onSearch(eve)} />
    </FormGroup>
    <div>{`From ${minDate} to to ${maxDate}`}</div>
</div>)