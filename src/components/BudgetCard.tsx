import * as React from "react";
import { connect } from "react-redux";

import { Budget } from "../Budget";
import { deleteBudget } from "../store/actions/Actions";

interface IProps {
    key: string,
    budget: Budget;
    delete: typeof deleteBudget;
}

class BudgetCard extends React.Component<IProps> {
    public render() {
        return (
            <div key={this.props.key} className={"itemCard"}>
                <div className={"cardInfo"}>
                    <span className={"cardName"}>{"Monthly Payment Budget"}</span>
                    <br></br>
                    <span>${this.props.budget.amount.toFixed(2)}/Month</span>
                </div>
                <div className={"deleteButtonWrapper"}>
                    <button className={"deleteCardButton"} onClick={this.handleDelete}>
                        <i className={"fa fa-trash"} aria-hidden={"true"}></i>
                    </button>
                </div>
            </div>
        )
    }

    private handleDelete = () => {
        this.props.delete(this.props.budget.id)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        delete: (budgetKey) => dispatch(deleteBudget(budgetKey)),
    }
}

export default connect(null, mapDispatchToProps)(BudgetCard);
