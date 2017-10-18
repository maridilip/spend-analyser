import * as actionType from './action-types'

const initialState = {
    isLoaded: false,
    isFetching: false,
    data: [],
    error: null,
    selectedCustomer: {}
}

const leadsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LEADS_DATA_GET: {
            return {
                ...initialState,
                isFetching: true
            }
        }

        case actionType.LEADS_DATA_COMPLETE: {
            return {
                ...initialState,
                isLoaded: true,
                data: action.payload
            }
        }

        case actionType.LEADS_DATA_ERROR: {
            return {
                ...initialState,
                isLoaded: true,
                error: action.payload
            }
        }
        case actionType.LEADS_DATA_SELECTED_CUSTOMER: {
            return {
                ...initialState,
                selectedCustomer: action.payload
            }
        }

        default: {
            return initialState
        }
    }
}

export default leadsReducer