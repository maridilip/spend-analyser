import * as actionType from './action-types'
import { getLeadsData as getLeadsDataService } from '../service'

export const getLeadsDataActionCreator = (oprId) => dispatch => {
    dispatch({
        type: actionType.LEADS_DATA_GET
    })
    getLeadsDataService(oprId).then(response => dispatch({
        type: actionType.LEADS_DATA_COMPLETE,
        payload: response
    })).catch(err => dispatch({
        type: actionType.LEADS_DATA_ERROR,
        payload: err
    }))
}

export const selectCustomerActionCreator = (customerDetails) => dispatch => {
    dispatch({
        type: actionType.LEADS_DATA_SELECTED_CUSTOMER,
        payload: customerDetails
    })
}