import * as ACTION_TYPES from '../actions/CreateLoanFormActionTypes';

interface State {
    name: string;
    balance: number;
    rate: number;
    minPmt: number;
    lastPaidOn: Date;
}

const initialState = {
    name: '',
    balance: 0,
    rate: 0,
    minPmt: 0,
    lastPaidOn: undefined
}

const CurrentLoanFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SUBMIT:
            return {
                ...state
            }
        case ACTION_TYPES.CLEAR:
            return {
                ...state,
                ...initialState
            }
        case ACTION_TYPES.BACK:
            return {
                ...state,
                ...initialState
            }
        case ACTION_TYPES.UPDATE_NAME:
            return {
                ...state,
                name: action.payload
            }
        case ACTION_TYPES.UPDATE_BALANCE:
            return {
                ...state,
                balance: action.payload
            }
        case ACTION_TYPES.UPDATE_RATE:
            return {
                ...state,
                rate: action.payload
            }
        case ACTION_TYPES.UPDATE_MIN_PMT:
            return {
                ...state,
                minPmt: action.payload
            }
        case ACTION_TYPES.UPDATE_LAST_PAID_ON:
            return {
                ...state,
                lastPaidOn: action.payload
            }
        default:
            return state
    }
}

export default CurrentLoanFormReducer;