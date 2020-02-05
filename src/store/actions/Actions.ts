import { ActionCreator } from "redux";

import * as AAT from "./Types";
import { Loan } from "../../Loan";

export const begin: ActionCreator<AAT.IActionsBegin> = () => ({
    type: AAT.ActionTypes.BEGIN,
    loanTypeChoiceFormOpen: true
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