import { ActionCreator } from "redux";

import * as AAT from "./Types";
import { Loan } from "../../Loan";

export const beginLoanCreate: ActionCreator<AAT.IActionsBeginLoanCreate> = () => ({
    type: AAT.ActionTypes.BEGIN_LOAN_CREATE,
    loanTypeChoiceFormOpen: true
})

export const beginPaymentCreate: ActionCreator<AAT.IActionsBeginPaymentCreate> = () => ({
    type: AAT.ActionTypes.BEGIN_PAYMENT_CREATE,
    paymentInputFormOpen: true
})

export const chooseCurrent: ActionCreator<AAT.IActionsChooseCurrent> = () => ({
    type: AAT.ActionTypes.CHOOSE_CURRENT,
    loanTypeChoiceFormOpen: false,
    currentLoanFormOpen: true
})

export const chooseFuture: ActionCreator<AAT.IActionsChooseFuture> = () => ({
    type: AAT.ActionTypes.CHOOSE_FUTURE,
    loanTypeChoiceFormOpen: false,
    futureLoanFormOpen: true
})

export const choiceExit: ActionCreator<AAT.IActionsChoiceExit> = () => ({
    type: AAT.ActionTypes.CHOICE_EXIT,
    loanTypeChoiceFormOpen: false
})

export const currentCreate: ActionCreator<AAT.IActionsCurrentCreate> = (newCurrentLoan: Loan) => ({
    type: AAT.ActionTypes.CURRENT_CREATE,
    newCurrentLoan: newCurrentLoan,
    currentLoanFormOpen: false
})

export const currentBack: ActionCreator<AAT.IActionsCurrentBack> = () => ({
    type: AAT.ActionTypes.CURRENT_BACK,
    currentLoanFormOpen: false,
    loanTypeChoiceFormOpen: true
})

export const currentExit: ActionCreator<AAT.IActionsCurrentExit> = () => ({
    type: AAT.ActionTypes.CURRENT_EXIT,
    currentLoanFormOpen: false
})

export const deleteLoan: ActionCreator<AAT.IActionsDeleteLoan> = (loanKey: string) => ({
    type: AAT.ActionTypes.DELETE_LOAN,
    loanKey: loanKey
})

export const futureCreate: ActionCreator<AAT.IActionsFutureCreate> = (newFutureLoan: Loan) => ({
    type: AAT.ActionTypes.FUTURE_CREATE,
    newFutureLoan: newFutureLoan,
    futureLoanFormOpen: false
})

export const futureBack: ActionCreator<AAT.IActionsFutureBack> = () => ({
    type: AAT.ActionTypes.FUTURE_BACK,
    futureLoanFormOpen: false,
    loanTypeChoiceFormOpen: true
})

export const futureExit: ActionCreator<AAT.IActionsFutureExit> = () => ({
    type: AAT.ActionTypes.FUTURE_EXIT,
    futureLoanFormOpen: false
})

export const paymentCreate: ActionCreator<AAT.IActionsPaymentCreate> = () => ({
    type: AAT.ActionTypes.PAYMENT_CREATE,
    paymentInputFormOpen: false
})

export const paymentExit: ActionCreator<AAT.IActionsPaymentExit> = () => ({
    type: AAT.ActionTypes.PAYMENT_EXIT,
    paymentInputFormOpen: false
})
