export interface ICurrentLoanState {
    name: string;
    balance: number;
    interestRate: number;
    minPmt: number;
    lastPaidOn: Date;
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
}

export type FormStates = ICurrentLoanState | IFutureLoanState