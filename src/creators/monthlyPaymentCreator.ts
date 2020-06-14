import { budget } from "../budget";
import { RandomID } from "../utils/RandomID";


export const createBudget = (amount: number): budget => {
    const payment: budget = {
        id: RandomID(),
        amount: amount,
    }
    return payment
}
