import { Budget } from "../Budget";
import { RandomID } from "../utils/RandomID";


export const createBudget = (amount: number): Budget => {
    const payment: Budget = {
        id: RandomID(),
        amount: amount,
    }
    return payment
}
