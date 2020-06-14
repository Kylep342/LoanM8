import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../store/Store";
import { budgetCreate, budgetExit } from "../store/actions/Actions";
import { IBudgetState } from "../types/BudgetTypes";
import { createBudget } from "../creators/monthlyPaymentCreator";

import "./style.css";

interface IProps {
    open: boolean;
    create: typeof budgetCreate;
    exit: typeof budgetExit;
}


class MonthlyPaymentFormContainer extends React.Component<IProps, IBudgetState> {
    state = {
        amount: undefined
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => (
            { ...prevState, [name]: value }
        ))
    }

    public render() {
        return (
            <div className={this.props.open ? "modal-wrapper modal-visible" : "modal-wrapper"}>
                <div className="modal-container">
                    <div className="modal-content-container">
                        <div className="modal-content">
                            <div className="modal-header">
                                <span className="modal-title">Creating a Monthly Payment Budget</span>
                                <span className="close" onClick={this.handleExitClick}>&times;</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor={"amount"} className={"form-label"}>Monthly Payment Budget: </label>
                                <input
                                    type={"number"}
                                    id={"budgetInput"}
                                    name={"amount"}
                                    value={this.state.amount || ""}
                                    step={"0.01"}
                                    placeholder={"Enter a Monthly Payment Budget"}
                                    onChange={this.handleInputChange}
                                /> {/* Monthly Payment Budget */}
                            </div>
                        </div>
                    </div>
                    <div className="modal-buttons-container">
                        <button
                            className={"button-primary"}
                            onClick={this.handleCreateClick}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    private clearFields = () => {
        this.setState({
            amount: undefined
        })
    }

    private handleCreateClick = () => {
        const newMonthlyPaymentBudget = createBudget(this.state.amount);
        this.props.create(newMonthlyPaymentBudget);
        this.clearFields();
    }

    private handleExitClick = () => {
        this.clearFields();
        this.props.exit();
    }
}

const mapStateToProps = (store: IApplicationState) => {
    return {
        open: store.app.budgetInputFormOpen
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        create: (newMonthlyPaymentBudget) => dispatch(budgetCreate(newMonthlyPaymentBudget)),
        exit: () => dispatch(budgetExit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyPaymentFormContainer);
