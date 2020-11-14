export interface ICurrentLoanState {
    name: string;
    balance: number;
    interestRate: number;
    autopay: boolean;
    minPmt: number;
    lastPaidOn: Date;
    id?: string;
}

export interface IFutureLoanState {
    name: string;
    principal: number;
    interestRate: number;
    firstDisbursementDate: Date;
    secondDisbursementDate: Date;
    subsidized: boolean;
    graduationDate: Date;
    autopay: boolean;
    id?: string;
}

export type FormStates = ICurrentLoanState | IFutureLoanState
