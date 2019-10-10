import * as ACTION_TYPES from './CreateLoanFormActionTypes'

export const SUBMIT = {
    type: ACTION_TYPES.SUBMIT
}

export const CLEAR = {
    type: ACTION_TYPES.CLEAR
}

export const BACK = {
    type: ACTION_TYPES.BACK
}

export const UPDATE_NAME = {
    type: ACTION_TYPES.UPDATE_NAME
}

export const UPDATE_BALANCE = {
    type: ACTION_TYPES.UPDATE_BALANCE
}

export const UPDATE_RATE = {
    type: ACTION_TYPES.UPDATE_RATE
}

export const UPDATE_MIN_PMT = {
    type: ACTION_TYPES.UPDATE_MIN_PMT
}

export const UPDATE_LAST_PAID_ON = {
    type: ACTION_TYPES.UPDATE_LAST_PAID_ON
}

export const submit = () => {
    return {
        type: ACTION_TYPES.SUBMIT
    }
}

export const clear = () => {
    return {
        type: ACTION_TYPES.CLEAR
    }
}

export const back = () => {
    return {
        type: ACTION_TYPES.BACK
    }
}

export const updateName = (text) => {
    return {
        type: ACTION_TYPES.UPDATE_NAME,
        payload: text
    }
}

export const updateBalance = (text) => {
    return {
        type: ACTION_TYPES.UPDATE_BALANCE,
        payload: text
    }
}

export const updateRate = (text) => {
    return {
        type: ACTION_TYPES.UPDATE_RATE,
        payload: text
    }
}

export const updateMinPmt = (text) => {
    return {
        type: ACTION_TYPES.UPDATE_MIN_PMT,
        payload: text
    }
}

export const updateLastPaidOn = (text) => {
    return {
        type: ACTION_TYPES.UPDATE_LAST_PAID_ON,
        payload: text
    }
}
