import { ActionCreator } from "redux";

import * as FAT from "./FormsTypes";
import { createCurrentLoan } from "../../creators/currentLoanCreator";
import { createFutureLoan } from "../../creators/futureLoanCreator";
import { ICurrentLoanState, IFutureLoanState } from "../../types/LoanTypes";

export const begin: ActionCreator<FAT.IFormsActionsBegin> = () => ({
    type: FAT.FormsActionTypes.BEGIN,
    loanTypeChoiceFormOpen: true
})

export const chooseCurrent: ActionCreator<FAT.IFormsActionsChooseCurrent> = () => ({
    type: FAT.FormsActionTypes.CHOOSE_CURRENT,
    loanTypeChoiceFormOpen: false,
    currentLoanFormOpen: true
})

export const chooseFuture: ActionCreator<FAT.IFormsActionsChooseFuture> = () => ({
    type: FAT.FormsActionTypes.CHOOSE_FUTURE,
    loanTypeChoiceFormOpen: false,
    futureLoanFormOpen: true
})

export const choiceExit: ActionCreator<FAT.IFormsActionsChoiceExit> = () => ({
    type: FAT.FormsActionTypes.CHOICE_EXIT,
    loanTypeChoiceFormOpen: false
})

export const currentCreate: ActionCreator<FAT.IFormsActionsCurrentCreate> = (formState: ICurrentLoanState) => ({
    type: FAT.FormsActionTypes.CURRENT_CREATE,
    newCurrentLoan: createCurrentLoan(formState),
    currentLoanFormOpen: false
})

export const currentBack: ActionCreator<FAT.IFormsActionsCurrentBack> = () => ({
    type: FAT.FormsActionTypes.CURRENT_BACK,
    currentLoanFormOpen: false,
    loanTypeChoiceFormOpen: true
})

export const currentExit: ActionCreator<FAT.IFormsActionsCurrentExit> = () => ({
    type: FAT.FormsActionTypes.CURRENT_EXIT,
    currentLoanFormOpen: false
})

export const futureCreate: ActionCreator<FAT.IFormsActionsFutureCreate> = (formState: IFutureLoanState) => ({
    type: FAT.FormsActionTypes.FUTURE_CREATE,
    newFutureLoan: createFutureLoan(formState),
    futureLoanFormOpen: false
})

export const futureBack: ActionCreator<FAT.IFormsActionsFutureBack> = () => ({
    type: FAT.FormsActionTypes.FUTURE_BACK,
    futureLoanFormOpen: false,
    loanTypeChoiceFormOpen: true
})

export const futureExit: ActionCreator<FAT.IFormsActionsFutureExit> = () => ({
    type: FAT.FormsActionTypes.FUTURE_EXIT,
    futureLoanFormOpen: false
})