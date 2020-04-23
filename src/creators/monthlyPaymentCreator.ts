import { monthlyPayment } from "../monthlyPayment";
import { RandomID } from "../utils/RandomID";


export const createMonthlyPayment = (amount: number): monthlyPayment => {
    const payment: monthlyPayment = {
        id: RandomID(),
        amount: amount,
    }

    return payment
}