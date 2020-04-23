import { Loan } from "../../Loan";
import { monthlyPayment } from "../../monthlyPayment";

export enum ActionTypes {
    BEGIN_LOAN_CREATE = "AAT/BEGIN_LOAN_CREATE",
    BEGIN_PAYMENT_CREATE = "AAT/BEGIN_PAYMENT_CREATE",
    CHOOSE_CURRENT = "AAT/CHOOSE_CURRENT",
    CHOOSE_FUTURE = "AAT/CHOOSE_FUTURE",
    CHOICE_EXIT = "AAT/CHOICE_EXIT",
    CURRENT_CREATE = "AAT/CURRENT_CREATE",
    CURRENT_BACK = "AAT/CURRENT_BACK",
    CURRENT_EXIT = "AAT/CURRENT_EXIT",
    DELETE_LOAN = "AAT/DELETE_LOAN",
    FUTURE_CREATE = "AAT/FUTURE_CREATE",
    FUTURE_BACK = "AAT/FUTURE_BACK",
    FUTURE_EXIT = "AAT/FUTURE_EXIT",
    PAYMENT_CREATE = "AAT/PAYMENT_CREATE",
    PAYMENT_EXIT = "AAT/PAYMENT_EXIT",
}

export interface IActionsBeginLoanCreate {
    type: ActionTypes.BEGIN_LOAN_CREATE;
    loanTypeChoiceFormOpen: boolean;
}

export interface IActionsBeginPaymentCreate {
    type: ActionTypes.BEGIN_PAYMENT_CREATE;
    paymentInputFormOpen: boolean;
}

export interface IActionsChooseCurrent {
    type: ActionTypes.CHOOSE_CURRENT;
    loanTypeChoiceFormOpen: boolean;
    currentLoanFormOpen: boolean;
}

export interface IActionsChooseFuture {
    type: ActionTypes.CHOOSE_FUTURE;
    loanTypeChoiceFormOpen: boolean;
    futureLoanFormOpen: boolean;
}

export interface IActionsChoiceExit {
    type: ActionTypes.CHOICE_EXIT;
    loanTypeChoiceFormOpen: boolean;
}

export interface IActionsCurrentCreate {
    type: ActionTypes.CURRENT_CREATE;
    newCurrentLoan: Loan;
    currentLoanFormOpen: boolean;
}

export interface IActionsCurrentBack {
    type: ActionTypes.CURRENT_BACK;
    currentLoanFormOpen: boolean;
    loanTypeChoiceFormOpen: boolean;
}

export interface IActionsCurrentExit {
    type: ActionTypes.CURRENT_EXIT;
    currentLoanFormOpen: boolean;
}

export interface IActionsDeleteLoan {
    type: ActionTypes.DELETE_LOAN;
    loanKey: string;
}

export interface IActionsFutureCreate {
    type: ActionTypes.FUTURE_CREATE;
    newFutureLoan: Loan;
    futureLoanFormOpen: boolean;
}

export interface IActionsFutureBack {
    type: ActionTypes.FUTURE_BACK;
    futureLoanFormOpen: boolean;
    loanTypeChoiceFormOpen: boolean;
}

export interface IActionsFutureExit {
    type: ActionTypes.FUTURE_EXIT;
    futureLoanFormOpen: boolean;
}

export interface IActionsPaymentCreate {
    type: ActionTypes.PAYMENT_CREATE;
    paymentInputFormOpen: boolean;
}

export interface IActionsPaymentExit {
    type: ActionTypes.PAYMENT_EXIT;
    paymentInputFormOpen: boolean;
}

export type Actions =
    | IActionsBeginLoanCreate
    | IActionsBeginPaymentCreate
    | IActionsChooseCurrent
    | IActionsChooseFuture
    | IActionsChoiceExit
    | IActionsCurrentCreate
    | IActionsCurrentBack
    | IActionsCurrentExit
    | IActionsDeleteLoan
    | IActionsFutureCreate
    | IActionsFutureBack
    | IActionsFutureExit
    | IActionsPaymentCreate
    | IActionsPaymentExit

export interface IAppState {
    readonly currentLoanFormOpen: boolean;
    readonly futureLoanFormOpen: boolean;
    readonly loanTypeChoiceFormOpen: boolean;
    readonly paymentInputFormOpen: boolean;
    readonly loans: Loan[];
    readonly monthlyPaymentBudgets: monthlyPayment[];
}