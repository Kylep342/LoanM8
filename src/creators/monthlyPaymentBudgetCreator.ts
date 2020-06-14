import { budget } from "../budget";
import { IBudgetState } from "../types/BudgetTypes";
import { RandomID } from "../utils/RandomID";


export const createMonthlyPaymentBudget = (state: IBudgetState): Budget => {
    const id = RandomID();
    const amount = state.amount;

    const budget: budget = {
        id: id,
        amount: amount
    }

    return budget
}
