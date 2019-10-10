import { combineReducers } from 'redux';

import CurrentLoanFormReducer from './CreateLoanReducer';

const rootReducer = combineReducers({
    currentLoanFormReducer: CurrentLoanFormReducer
})

export default rootReducer;