/**
 * Types for payment logic
 */


// ILoanState holds information about a loan's state for a given date
export interface ILoanState {
    date: Date;
    balance: number;
    principal: number;
    interest: number;
}

// IDailyBalanceData holds arrays containing data about
export interface IDailyBalanceData {
    dates: Array<Date>;
    balances: Array<number>;
}

// IPayment holds information about the resulting values from a payment
export interface IPaymentResult {
    payment: number;
    principal: number;
    interest: number;
}
