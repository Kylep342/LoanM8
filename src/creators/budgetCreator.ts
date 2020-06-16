import { Budget } from "../Budget";
import { IBudgetState } from "../types/BudgetTypes";
import { RandomID } from "../utils/RandomID";


export const createBudget = (state: IBudgetState): Budget => {
    const amount = parseFloat(state.amount)

    const budget: Budget = {
        id: RandomID(),
        amount: amount
    }

    return budget
}
