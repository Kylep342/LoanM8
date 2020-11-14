import { FormStates } from "./types/LoanStateTypes";

export enum LoanTypes {
    Current = "CURRENT",
    Future = "FUTURE"
}

export interface Loan {
    // fields that are entered by the user
    name: string;
    balance: number;
    interestRate: number;
    minPmt: number;
    lastPaidOn: Date;
    autopay: boolean;
    // necessary fields that are hidden and/or computed after user input
    principal: number;
    interest: number;
    dueOn: number;
    beginRepaymentDate: Date;
    lifetimePrincipalPaid: number;
    lifetimeInterestPaid: number;
    // flag indicating 
    type: LoanTypes;
    id: string;
    //TODO: Implement editing with this member
    // form state
    formState: FormStates
}
